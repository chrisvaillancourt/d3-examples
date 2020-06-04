import './svg-world-map.css';
import { json, csv } from 'd3-fetch';
import { geoEqualEarth, geoPath, geoGraticule10 } from 'd3-geo';
import { select, selectAll } from 'd3-selection';
import { extent, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import { transition } from 'd3-transition';

console.time('draw map');
async function createMap() {
  // step 1) load data

  var countryShapes = await json('../data/world-geojson.json');
  var dataset = await csv('../data/data_bank_data.csv');
  const metric = 'Population growth (annual %)';

  function countryNameAccessor(d) {
    return d.properties['NAME'];
  }
  function countryIdAccessor(d) {
    return d.properties['ADM0_A3_IS'];
  }
  var metricDataByCountry = new Map();

  dataset.forEach(function getCountryMetric(d) {
    if (d['Series Name'] != metric) return;
    metricDataByCountry.set(d['Country Code'], Number(d['2017 [YR2017]']) || 0);
  });
  // step 2) create chart dimensions
  var dimensions = {
    width: window.innerWidth * 0.9,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  };

  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  // height of the map will be set by the map projection

  var sphere = { type: 'Sphere' };

  // a projection function is a scale for geo data
  // we need to update the projection's width
  var projection = geoEqualEarth().fitWidth(dimensions.boundedWidth, sphere);
  var pathGenerator = geoPath(projection);
  var [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere);
  dimensions.boundedHeight = y1;
  dimensions.height =
    dimensions.boundedHeight + dimensions.margin.top + dimensions.margin.bottom;
  // step 3) draw canvas

  var wrapper = select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  var bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top})`
    );
  // step 4) set-up scales
  // prokection covers our x and y scales

  var metricValues = Array.from(metricDataByCountry.values());
  var metricValueExtent = extent(metricValues);
  // if we use a domain and range with more than 2 values, d3 will create a scale with more than two 'anchors'

  var maxChange = max([-metricValueExtent[0], metricValueExtent[1]]);
  // var colorScale = scaleLinear()
  //   .domain([-maxChange, 0, maxChange])
  //   .range('indigo', 'white', 'darkgreen');
  var colorScale = scaleLinear()
    .domain([-maxChange, 0, maxChange])
    .range(['indigo', 'white', 'darkgreen']);

  // step 5) draw data

  var earth = bounds
    .append('path')
    .attr('class', 'earth')
    .attr('d', pathGenerator(sphere));

  var graticuleJson = geoGraticule10();

  var graticule = bounds
    .append('path')
    .attr('class', 'graticule')
    .attr('d', pathGenerator(graticuleJson));

  // we want to use countryShapes.features b/c d3 will create an element for each item in the dataset
  // and the features are all we care about
  var countries = bounds
    .selectAll('.country')
    .data(countryShapes.features)
    .enter()
    .append('path')
    .attr('class', 'country')
    .attr('d', pathGenerator)
    .attr('fill', function (d) {
      var metricValue = metricDataByCountry.get(countryIdAccessor(d));
      return typeof metricValue == 'undefined'
        ? '#e2e6e9'
        : colorScale(metricValue);
    });
  // step 6) draw peripherals
  var legendWidth = 120;
  var legendHeight = 16;

  var legendYTransform =
    dimensions.width < 800
      ? dimensions.boundedHeight - 30
      : dimensions.boundedHeight * 0.5;
  var legendGroup = wrapper
    .append('g')
    .attr('transform', `translate(120, ${legendYTransform})`);

  var legendTitle = legendGroup
    .append('text')
    .attr('y', -23)
    .attr('class', 'legend-title')
    .text('Population Growth');
  var legendByline = legendGroup
    .append('text')
    .attr('y', -9)
    .attr('class', 'legend-byline')
    .text('Percent change in 2017');

  // use defs to store a legend gradient
  var defs = wrapper.append('defs');
  // var legendGradientId = 'legend-gradient'

  // svg linearGradient uses a stop-color and offset attribute to interpolate between colors
  // colorScale.range() creates an array of the colors in our scale
  // use enter().append() to create one stop per color
  var legendGradientId = 'legend-gradient';
  var colorScaleArrayLength = colorScale.range().length;
  var gradient = defs
    .append('linearGradient')
    .attr('id', legendGradientId)
    .selectAll('stop')
    .data(colorScale.range())
    .enter()
    .append('stop')
    .attr('stop-color', function getColor(d) {
      return d;
    })
    .attr('offset', function createIndexOffset(d, i) {
      return `${(i * 100) / colorScaleArrayLength - 1}%`;
    });

  var legendGradient = legendGroup
    .append('rect')
    .attr('x', -legendWidth / 2)
    .attr('height', legendHeight)
    .attr('width', legendWidth)
    .style('fill', `url(#${legendGradientId})`);

  var legendValueRight = legendGroup
    .append('text')
    .attr('class', 'legend-value')
    .attr('x', legendWidth / 2 + 10)
    .attr('y', legendHeight / 2)
    .text(`${format('.1f')(maxChange)}%`);

  var legendValueLeft = legendGroup
    .append('text')
    .attr('class', 'legend-value')
    .attr('x', -legendWidth / 2 - 10)
    .attr('y', legendHeight / 2)
    .text(`${format('.1f')(-maxChange)}%`)
    .style('text-anchor', 'end');

  navigator.geolocation.getCurrentPosition(function getUserLocation(position) {
    const [x, y] = projection([
      position.coords.longitude,
      position.coords.latitude,
    ]);

    var userLocation = bounds
      .append('circle')
      .attr('class', 'my-location')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 0)
      .transition()
      .duration(500)
      .attr('r', 10);
  });

  // step 7) set-up user interaction
  var tooltip = select('#tooltip');
  countries
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave);

  function handleMouseEnter(datum) {
    // datum contains the data bound to the hovered element
    var metricValue = metricDataByCountry.get(countryIdAccessor(datum));
    tooltip.select('#country').text(countryNameAccessor(datum));
    tooltip.select('#value').text(`${format(',.2f')(metricValue || 0)}%`);

    // the pathGenerator has a .centroid() method that returns the center of a geoJSON object
    const [centroidX, centroidY] = pathGenerator.centroid(datum);
    const x = centroidX + dimensions.margin.left;
    const y = centroidY + dimensions.margin.top;
    tooltip.style(
      'transform',
      `translate(calc(-50% + ${x}px), calc(-100% + ${y}px))`
    );

    tooltip.style('opacity', 1);
  }
  function handleMouseLeave() {
    tooltip.style('opacity', 0);
  }
}

createMap().then(() => console.timeEnd('draw map'));
