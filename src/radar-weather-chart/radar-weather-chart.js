import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './radar-weather-chart.css';
import { json } from 'd3-fetch';
import { select } from 'd3-selection';
import { timeParse, timeFormat } from 'd3-time-format';
import { scaleTime, scaleLinear, scaleSqrt } from 'd3-scale';
import { extent, range } from 'd3-array';
import { timeMonths } from 'd3-time';
import { format } from 'd3-format';
import { areaRadial } from 'd3-shape';
import { interpolateYlOrRd } from 'd3-scale-chromatic';

console.time('create radar chart');
function createDimensions({ customDimensions = {} } = {}) {
  // Used to create a dimensions data obj for creating chart dimensions.
  // Pass customDimesions to return an obj with extra key/value pairs.
  return {
    margin: {
      top: 120,
      right: 120,
      bottom: 120,
      left: 120,
    },
    get width() {
      return (
        ((window.innerWidth > 1500 ? 1500 : window.innerWidth) -
          this.margin.left -
          this.margin.right) *
        0.75
      );
    },
    get boundedWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get height() {
      return this.width;
    },
    get boundedHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    },
    get radius() {
      return this.width / 2;
    },
    get boundedRadius() {
      return this.radius - (this.margin.left + this.margin.right) / 2;
    },
    ...customDimensions,
  };
}

function setupDom() {
  var parent = document.querySelector('#flex');
  var fragment = new DocumentFragment();
  var wrapper = document.createElement('div');
  wrapper.id = 'wrapper';
  fragment.appendChild(wrapper);
  parent.appendChild(fragment);
}

async function createRadarChart() {
  // step 1) access data
  console.time('load data');
  var data = await json('../data/nyc_weather_data.json');
  console.timeEnd('load data');
  // console.table(data[0]);
  function temperatureMinAccessor(d) {
    return d.temperatureMin;
  }
  function temperatureMaxAccessor(d) {
    return d.temperatureMax;
  }
  function uvAccessor(d) {
    return d.uvIndex;
  }
  function precipitationProbabilityAccessor(d) {
    return d.precipProbability;
  }
  function precipitationTypeAccessor(d) {
    return d.precipType;
  }
  function cloudAccessor(d) {
    return d.cloudCover;
  }
  var dateParser = timeParse('%Y-%m-%d');

  function dateAccessor(d) {
    return dateParser(d.date);
  }

  // step 2) create chart dimensions
  var dimensions = createDimensions();
  // step 3) draw canvas
  var wrapper = select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  // shift bounds to start in the center of the chart
  // This will be helpful when we decide where to place data and peripheral elements
  // We'll only need to know where they sit with respect to the center of the circle
  var bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left + dimensions.boundedRadius}px, ${
        dimensions.margin.top + dimensions.boundedRadius
      }px)`
    );
  var defs = wrapper.append('defs');
  var gradientId = 'temperature-gradient';
  var gradient = defs.append('radialGradient').attr('id', gradientId);
  const numberOfStops = 10;
  var gradientColorScale = interpolateYlOrRd;

  range(numberOfStops).forEach(function (i) {
    gradient
      .append('stop')
      .attr('offset', `${(i * 100) / (numberOfStops - 1)}%`)
      .attr('stop-color', gradientColorScale(i / (numberOfStops - 1)));
  });

  // step 4) create scales
  // the location of a data element around the radar chart's center corresponds to its date
  var angleScale = scaleTime()
    .domain(extent(data, dateAccessor))
    .range([0, Math.PI * 2]); // this is in radians
  // a circle has 2π radians
  var radiusScale = scaleLinear()
    .domain(
      extent([
        ...data.map(temperatureMaxAccessor),
        ...data.map(temperatureMinAccessor),
      ])
    )
    .range([0, dimensions.boundedRadius])
    .nice();
  function getXFromDataPoint(d, offset = 1.4) {
    return getCoordsForAngle(angleScale(dateAccessor(d)), offset)[0];
  }
  function getYFromDataPoint(d, offset = 1.4) {
    return getCoordsForAngle(angleScale(dateAccessor(d)), offset)[1];
  }
  var cloudRadiusScale = scaleSqrt()
    .domain(extent(data, cloudAccessor))
    .range([1, 10]);
  // step 5) draw peripherals
  // doing this before data drawing (typically step 5)
  // drawing peripherals first is helpful when we want to layer data elements on top of chart peripherals

  var peripherals = bounds.append('g');

  function getCoordsForAngle(angle, offset = 1) {
    // dimensions.boundedRadius * offset is the triangle's hypotenuse
    // we need to adjust the angle
    // because the radar chart starts in the center, above our origin point
    return [
      Math.cos(angle - Math.PI / 2) * dimensions.boundedRadius * offset,
      Math.sin(angle - Math.PI / 2) * dimensions.boundedRadius * offset,
    ];
  }
  // create an array for each month in the data
  // d3 time intervals range() method will return a list of datetime objects
  // spaced by a specified interval
  var months = timeMonths(...angleScale.domain()); // same as timeMonth.range(...angleScale.domain())
  months.forEach(function drawLinesForEachMonth(month) {
    var angle = angleScale(month);
    const [x, y] = getCoordsForAngle(angle);
    // we don't need to specify x1/y1 because they default to 0
    peripherals
      .append('line')
      .attr('x2', x)
      .attr('y2', y)
      .attr('class', 'grid-line');

    const [labelX, labelY] = getCoordsForAngle(angle, 1.38);
    peripherals
      .append('text')
      .attr('x', labelX)
      .attr('y', labelY)
      .attr('class', 'tick-label')
      .text(timeFormat('%b')(month))
      .style(
        'text-anchor',
        // dynamically set value based on x position
        Math.abs(labelX) < 5 ? 'middle' : labelX > 0 ? 'start' : 'end'
      );
  });
  var temperatureTicks = radiusScale.ticks(4);
  var gridCircles = temperatureTicks.map(function drawCircleGridLines(d) {
    return peripherals
      .append('circle')
      .attr('r', radiusScale(d))
      .attr('class', 'grid-line');
  });
  var tickLabelBackgrounds = temperatureTicks.map(function (d) {
    if (!d) return;
    return peripherals
      .append('rect')
      .attr('y', -radiusScale(d) - 10)
      .attr('width', 40)
      .attr('height', 20)
      .attr('fill', '#ffffff');
  });
  var tickLabels = temperatureTicks.map(function (d) {
    if (!d) return;
    return peripherals
      .append('text')
      .attr('x', 4)
      .attr('y', -radiusScale(d) + 2)
      .attr('class', 'tick-label-temperature')
      .html(`${format('.0f')(d)}°F`);
  });

  // step 6) draw data
  const freezingPoint = 32;
  var containsFreezing = radiusScale.domain()[0] < freezingPoint;
  if (containsFreezing) {
    const freezingCircle = bounds
      .append('circle')
      .attr('r', radiusScale(freezingPoint))
      .attr('class', 'freezing-circle');
  }
  // areaGenerator returns the d attribute string for a <path> element
  var areaGenerator = areaRadial()
    .angle(function (d) {
      return angleScale(dateAccessor(d));
    })
    .innerRadius(function getMinTempPosition(d) {
      return radiusScale(temperatureMinAccessor(d));
    })
    .outerRadius(function getMaxTempPosition(d) {
      return radiusScale(temperatureMaxAccessor(d));
    });
  // create path element and set d attribute
  var area = bounds
    .append('path')
    // .attr('class', 'area')
    .attr('d', areaGenerator(data))
    .attr('fill', `url(#${gradientId})`);
  const uvIndexThreshold = 8;
  // offset UV lines to a point just inside the edges of the radius
  const uvOffset = 0.95;
  var uvGroup = bounds.append('g');
  const uvCoordinateOffset = 0.1;
  var highUvDays = uvGroup
    .selectAll('line')
    .data(
      data.filter(function getDaysAboveUvThreshold(d) {
        return uvAccessor(d) > uvIndexThreshold;
      })
    )
    .enter()
    .append('line')
    .attr('class', 'uv-line')
    .attr('x1', (d) => getXFromDataPoint(d, uvOffset))
    .attr('x2', (d) => getXFromDataPoint(d, uvOffset + uvCoordinateOffset))
    .attr('y1', (d) => getYFromDataPoint(d, uvOffset))
    .attr('y2', (d) => getYFromDataPoint(d, uvOffset + uvCoordinateOffset));

  var cloudGroup = bounds.append('g');
  const cloudOffset = 1.27;
  var cloudDots = cloudGroup
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'cloud-dot')
    .attr('cx', function getCloudCircleX(d) {
      return getXFromDataPoint(d, cloudOffset);
    })
    .attr('cy', function getCloudCircleY(d) {
      return getYFromDataPoint(d, cloudOffset);
    })
    .attr('r', function getCloudCircleR(d) {
      return cloudRadiusScale(cloudAccessor(d));
    });
}

setupDom();
createRadarChart()
  .then(() => console.timeEnd('create radar chart'))
  .catch(console.error);
