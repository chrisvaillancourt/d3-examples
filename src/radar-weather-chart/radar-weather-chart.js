import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './radar-weather-chart.css';
import { json } from 'd3-fetch';
import { select } from 'd3-selection';
import { timeParse } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import { extent } from 'd3-array';

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
      return (window.innerWidth - this.margin.left - this.margin.right) * 0.75;
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
  console.table(data[0]);
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
  var bounds = wrapper
    .append('g')
    .style('transform', `translate(${dimensions.margin})`);

  // step 4) create scales
  // the location of a data element around the radar chart's center corresponds to its date
  const angleScale = scaleTime()
    .domain(extent(data, dateAccessor))
    .range([0, Math.PI * 2]); // this is in radians
  // a circle has 2π radians

  // step 5) draw peripherals
  // doing this before data drawing (typically step 5)
}

setupDom();
createRadarChart()
  .then(() => console.timeEnd('create radar chart'))
  .catch(console.error);
