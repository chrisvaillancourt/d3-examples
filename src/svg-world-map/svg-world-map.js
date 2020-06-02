import './svg-world-map.css';
import { json, csv } from 'd3-fetch';
import { geoEqualEarth, geoPath, geoGraticule10 } from 'd3-geo';
import { select, selectAll } from 'd3-selection';
import { extent, max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

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
}

createMap().then(() => console.timeEnd('draw map'));
