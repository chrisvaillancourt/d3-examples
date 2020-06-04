import './heatmap.css';
import { json } from 'd3-fetch';
import { timeParse, timeFormat } from 'd3-time-format';
import { timeWeeks } from 'd3-time';
console.time('draw heatmap');
async function createHeatmap() {
  // step 1) access data

  var data = await json('../data/nyc_weather_data.json');

  var parseDate = timeParse('%Y-%m-%d');
  function dateAccessor(d) {
    return parseDate(d.date);
  }
  data = data.sort(function sortTime(a, b) {
    return dateAccessor(a) - dateAccessor(b);
  });

  var weekFormat = timeFormat('%-e');
  var dayOfWeekFormat = timeFormat('%-w');
  const firstDate = dateAccessor(data[0]);
  function xAccessor(d) {
    return timeWeeks(firstDate, dateAccessor(d)).length;
  }
  function yAccessor(d) {
    return Number(dayOfWeekFormat(dateAccessor(d)));
  }

  // step 2) Create chart Dimensions

  const numberOfWeeks = Math.ceil(data.length / 7) + 1;

  var dimensions = {
    margin: {
      top: 30,
      right: 0,
      bottom: 0,
      left: 80,
    },
  };
  dimensions.width =
    (window.innerWidth - dimensions.margin.left - dimensions.margin.right) *
    0.95;
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.height =
    (dimensions.boundedWidth * 7) / numberOfWeeks +
    dimensions.margin.top +
    dimensions.margin.bottom;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
}
createHeatmap().then(() => console.timeEnd('draw heatmap'));
