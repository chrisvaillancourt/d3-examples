import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './heatmap.css';
import { json } from 'd3-fetch';
import { timeParse, timeFormat } from 'd3-time-format';
import { timeWeeks, timeMonths } from 'd3-time';
import { select, selectAll } from 'd3-selection';
import { min, extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
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
    get width() {
      return (window.innerWidth - this.margin.left - this.margin.right) * 0.95;
    },
    get boundedWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get height() {
      return (
        (this.boundedWidth * 7) / numberOfWeeks +
        this.margin.top +
        this.margin.bottom
      );
    },
    get boundedHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    },
  };

  // step 3) draw canvas

  var wrapper = select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);
  var bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  // step 4) create scales

  var totalBarDimension = min([
    dimensions.boundedWidth / numberOfWeeks,
    dimensions.boundedHeight / 7,
  ]);

  // step 5) Draw data

  var monthFormat = timeFormat('%b');
  var months = bounds
    .selectAll('.month')
    .data(
      timeMonths(dateAccessor(data[0]), dateAccessor(data[data.length - 1]))
    )
    .enter()
    .append('text')
    .attr('class', 'month')
    .attr('transform', function setX(d) {
      return `translate(${
        totalBarDimension * timeWeeks(firstDate, d).length
      }, -10)`;
    })
    .text(function getMonth(d) {
      return monthFormat(d);
    });
  var parseDayOfWeek = timeParse('%-e');
  var dayOfWeekTickFormat = timeFormat('%-A');
  var labels = bounds
    .selectAll('.label')
    .data(
      new Array(7).fill(null).map(function getIndex(d, i) {
        return i;
      })
    )
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('transform', function setY(d) {
      return `translate(-10, ${totalBarDimension * (d + 0.5)})`;
    })
    .text(function (d) {
      return dayOfWeekTickFormat(parseDayOfWeek(d));
    });
  function drawDays(metric) {
    select('#metric').text(metric);
    function colorAccessor(d) {
      return d[metric];
    }
    var colorRangeDomain = extent(data, colorAccessor);
    var colorRange = scaleLinear()
      .domain(colorRangeDomain)
      .range([0, 1])
      .clamp(true);
    var colorGradient = interpolateHcl('#ecf0f1', '#5758BB');
    function colorScale(d) {
      return colorGradient(colorRange(d) || 0);
    }
    select('#legend-min').text(colorRangeDomain[0]);
    select('#legend-max').text(colorRangeDomain[1]);
    select('#legend-gradient').style(
      'background',
      `linear-gradient(to right, ${new Array(10)
        .fill(null)
        .map(function (d, i) {
          return `${colorGradient(i / 9)} ${(i * 100) / 9}%`;
        })
        .join(', ')})`
    );
    var days = bounds.selectAll('.day').data(data, function getDate(d) {
      return d.date;
    });
    var newDays = days.enter().append('rect');
    var allDays = newDays
      .merge(days)
      .attr('class', 'day')
      .attr('x', function setX(d) {
        return totalBarDimension * xAccessor(d);
      })
      .attr('width', totalBarDimension)
      .attr('y', function setY(d) {
        return totalBarDimension * yAccessor(d);
      })
      .attr('height', totalBarDimension)
      .style('fill', function setFill(d) {
        return colorScale(colorAccessor(d));
      });
    days.exit().remove();
  }
  var metrics = [
    'moonPhase',
    'windSpeed',
    'dewPoint',
    'humidity',
    'uvIndex',
    'windBearing',
    'temperatureMin',
    'temperatureMax',
  ];

  drawDays(metrics[metrics.length - 1]);

  // var btn = select('#heading').append('button').text('Change Metric');

  var dropdownLabel = select('#heading').append('label');
  dropdownLabel.attr('for', 'metric-select').text('Select Metric');
  var dropDown = select('#heading')
    .append('select')
    .attr('name', 'metrics')
    .attr('id', 'metric-select');

  var options = dropDown
    .selectAll('options')
    .data(metrics)
    .enter()
    .append('option')
    .text((d) => d)
    .attr('value', (d) => d)
    .property('selected', function (d) {
      return d == 'temperatureMax' ? true : null;
    });
  dropDown.node().addEventListener('change', handleChange);

  function handleChange(e) {
    var newMetric = e.target.value;
    drawDays(newMetric);
  }
}
createHeatmap().then(() => console.timeEnd('draw heatmap'));
