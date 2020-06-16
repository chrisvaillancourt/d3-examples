import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './animated-sankey-diagram.css';
import { json } from 'd3-fetch';
import { range } from 'd3-array';

async function createAnimatedSankey() {
  // step 1) access data
  var data = await json('../data/education.json');
  function sexAccessor(d) {
    return d.sex;
  }
  // we'll sample from this sexes array when we generate a person
  var sexes = ['female', 'male'];
  // list of ids that correspond to sexes
  var sexIds = range(sexes.length);
}

console.time('create chart');

createAnimatedSankey()
  .then(() => console.timeEnd('create chart'))
  .catch(console.error);
function createDimensions({ customDimensions = {} } = {}) {
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
