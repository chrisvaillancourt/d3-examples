import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './radar-weather-chart.css';
import { json } from 'd3-fetch';
import { select } from 'd3-selection';
import { timeParse, timeFormat } from 'd3-time-format';
import { scaleTime, scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale';
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
  var precipitationRadiusScale = scaleSqrt()
    .domain(extent(data, precipitationProbabilityAccessor))
    .range([1, 8]);
  var precipitationTypes = ['rain', 'sleet', 'snow'];
  var precipitationTypeColorScale = scaleOrdinal()
    .domain(precipitationTypes)
    .range(['#54a0ff', '#636e72', '#b2bec3']);
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
  var precipitationGroup = bounds.append('g');
  const precipitationOffset = 1.14;
  var precipitationDots = precipitationGroup
    .selectAll('circle')
    .data(data.filter(precipitationTypeAccessor))
    .enter()
    .append('circle')
    .attr('class', 'precipitation-dot')
    .attr('cx', function getPrecipCircleX(d) {
      return getXFromDataPoint(d, precipitationOffset);
    })
    .attr('cy', function getPrecipCircleY(d) {
      return getYFromDataPoint(d, precipitationOffset);
    })
    .attr('r', function getRadiusFromPrecipType(d) {
      return precipitationRadiusScale(precipitationProbabilityAccessor(d));
    })
    .style('fill', function getColorFromPrecipType(d) {
      return precipitationTypeColorScale(precipitationTypeAccessor(d));
    });
  var annotationGroup = bounds.append('g');
  function drawAnnotation({ angle, offset, text, annotationGrp }) {
    // draw lines 1.6 times our circle's radius
    const lineOffset = 1.6;
    const textXCoordOffset = 6;
    const [x1, y1] = getCoordsForAngle(angle, offset);
    const [x2, y2] = getCoordsForAngle(angle, lineOffset);

    annotationGrp
      .append('line')
      .attr('class', 'annotation-line')
      .attr('x1', x1)
      .attr('x2', x2)
      .attr('y1', y1)
      .attr('y2', y2);

    annotationGrp
      .append('text')
      .attr('class', 'annotation-text')
      .attr('x', x2 + textXCoordOffset)
      .attr('y', y2)
      .text(text);
  }
  // set angle (in radians) of annotations around the center of the chart
  // a circle has 2pie radians in one full rotation
  const cloudCoverAnnotationAngle = Math.PI * 0.23;
  const precipitationAnnotationAngle = Math.PI * 0.26;
  const uvIndexThresholdAnnotationAngle = Math.PI * 0.734;
  const uvIndexThresholdAnnotationOffset = uvOffset + 0.05;
  const uvAnnotationText = `UV Index over ${uvIndexThreshold}`;
  const tempAnnotationAngle = Math.PI * 0.7;
  const tempAnnotationOffset = 0.5;
  const freezingTempAnnotationAngle = Math.PI * 0.9;
  // have to convert freezing point into a value relative to our bounded radius since
  // drawAnnotation() takes an offset instead of a radius value
  const freezingTempOffset =
    radiusScale(freezingPoint) / dimensions.boundedRadius;

  drawAnnotation({
    angle: cloudCoverAnnotationAngle,
    offset: cloudOffset,
    text: 'Cloud Cover',
    annotationGrp: annotationGroup,
  });
  drawAnnotation({
    angle: precipitationAnnotationAngle,
    offset: precipitationOffset,
    text: 'Precipitation',
    annotationGrp: annotationGroup,
  });
  drawAnnotation({
    angle: uvIndexThresholdAnnotationAngle,
    offset: uvIndexThresholdAnnotationOffset,
    text: uvAnnotationText,
    annotationGrp: annotationGroup,
  });
  drawAnnotation({
    angle: tempAnnotationAngle,
    offset: tempAnnotationOffset,
    text: 'Temperature',
    annotationGrp: annotationGroup,
  });
  if (containsFreezing) {
    drawAnnotation({
      angle: freezingTempAnnotationAngle,
      offset: freezingTempOffset,
      text: 'Freezing Temperatures',
      annotationGrp: annotationGroup,
    });
  }
  // create precipitation color legend
  const precipLabelAngle = Math.PI * 0.26;
  const precipLabelCoordOffset = 1.6;
  const precipCircleXOffset = 15;
  const precipAnnotationYOffset = (index) => 16 * (index + 1);
  const [precipLabelXCoord, precipLabelYCoord] = getCoordsForAngle(
    precipLabelAngle,
    precipLabelCoordOffset
  );
  const precipLabelTextXOffset = 25;

  precipitationTypes.forEach(function (precipitationType, index) {
    annotationGroup
      .append('circle')
      .attr('cx', precipLabelXCoord + precipCircleXOffset)
      .attr('cy', precipLabelYCoord + precipAnnotationYOffset(index))
      .attr('r', 4)
      .style('opacity', 0.7)
      .attr('fill', precipitationTypeColorScale(precipitationType));
    annotationGroup
      .append('text')
      .attr('class', 'annotation-text')
      .attr('x', precipLabelXCoord + precipLabelTextXOffset)
      .attr('y', precipLabelYCoord + precipAnnotationYOffset(index))
      .text(precipitationType);
  });
}

setupDom();
createRadarChart()
  .then(() => console.timeEnd('create radar chart'))
  .catch(console.error);
