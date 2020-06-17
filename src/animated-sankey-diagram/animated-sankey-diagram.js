import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './animated-sankey-diagram.css';
import { json } from 'd3-fetch';
import { range, min, bisect } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

async function createAnimatedSankey() {
  // step 1) access data
  var data = await json('../data/education.json');
  // console.log(data);
  function sexAccessor(d) {
    return d.sex;
  }
  function educationAccessor(d) {
    return d.education;
  }
  function sesAccessor(d) {
    return d.ses;
  }
  // we'll sample from this sexes array when we generate a person
  var sexes = ['female', 'male'];
  // list of ids that correspond to sexes
  var sexIds = range(sexes.length);
  // hardcoding the educationNames array lets us easily order the values
  var educationNames = [
    '<High School',
    'High School',
    'Some Post-secondary',
    'Post-secondary',
    "Associate's",
    "Bachelor's and up",
  ];
  var educationIds = range(educationNames.length);
  var sesNames = ['low', 'middle', 'high'];
  var sesIds = range(sesNames.length);
  function getStatusKey({ sex, ses }) {
    return [sex, ses].join('--');
  }
  var stackedProbabilities = {};
  // TODO clean-up generation of stackedProbabilities
  data.forEach(function (startingPoint) {
    var key = getStatusKey(startingPoint);
    var stackedProbability = 0;
    stackedProbabilities[key] = educationNames.map(function (education, i) {
      stackedProbability += startingPoint[education] / 100;
      if (i == educationNames.length - 1) {
        // account for rounding error
        return 1;
      } else {
        return stackedProbability;
      }
    });
  });

  function generatePerson() {
    var sex = getRandomValue(sexIds);
    var ses = getRandomValue(sesIds);
    var statusKey = getStatusKey({
      sex: sexes[sex],
      ses: sesNames[ses],
    });
    // get respective probabilities
    var probabilities = stackedProbabilities[statusKey];

    // use bisect to find the index were the random number
    // will fit in the probabilities array
    var education = bisect(probabilities, Math.random());

    return {
      sex,
      ses,
      education,
    };
  }

  // step 2) create chart dimensions
  var dimensions = createDimensions({
    customDimensions: {
      pathHeight: 50,
    },
  });

  // step 3) Draw canvas
  var wrapper = select('#wrapper')
    .append('svg')
    .attr('height', dimensions.width)
    .attr('width', dimensions.width);

  var bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  // step 4) create scales
  // we'll use the xScale to convert a person's progress (left -> right)
  // into a x-position.
  // Progress will be represented with a number from 0 (not started) -> 1 (reached right side)
  // use clamp to prevent getting a value beyond our chart width

  var xScale = scaleLinear()
    .domain([0, 1])
    .range([0, dimensions.boundedWidth])
    .clamp(true);

  // the Y-scale will convert a socioeconomic id into a y position.
  // We want the paths to be evenly spaced between the bounds and still fit within
  // the total size. We can get this by padding the scale's domain by setting it to [-1, 3]
  // instead of [ 0, 2 ].
  // We'll also invert the domain to be [ 3, -1 ] b/c we want the highest y position
  // (in svg, higher y pushes you down the page) to correspond to the lowest id

  var startYScale = scaleLinear()
    .domain([sesIds.length, -1])
    .range(0, dimensions.boundedHeight);
  var endYScale = scaleLinear()
    .domain([educationIds.length, -1])
    .range([0, dimensions.boundedHeight]);

  // step 5) draw data

  //step 6) draw peripherals

  //step 7) set-up interactions
}

console.time('create chart');

createAnimatedSankey()
  .then(() => console.timeEnd('create chart'))
  .catch(console.error);

// utils
function createDimensions({ customDimensions = {} } = {}) {
  return {
    margin: {
      top: 10,
      right: 200,
      bottom: 10,
      left: 120,
    },
    get width() {
      return min([window.innerWidth * 0.9, 1200]);
    },
    get boundedWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get height() {
      // return this.width;
      return 500;
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
function getRandomNumberInRange({ min, max }) {
  return Math.random() * (max - min) + min;
}
function getRandomValue(arr) {
  return arr[Math.floor(getRandomNumberInRange({ min: 0, max: arr.length }))];
}
function sentenceCase(str) {
  return [str.slice(0, 1).toUpperCase(), str.slice(1)].join('');
}
