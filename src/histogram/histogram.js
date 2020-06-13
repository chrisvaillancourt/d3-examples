// import '@exampledev/new.css';
import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './histogram.css';
import { json } from 'd3-fetch';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent, max, histogram, mean } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { format } from 'd3-format';
import { createDimensions } from '../utils/createDimensions';
console.time('render histogram');

async function drawBars() {
  // 1. Access data

  const dataset = await json('../data/nyc_weather_data.json');

  // 2. Create chart dimensions
  const width = window.innerWidth < 600 ? window.innerWidth : 600;
  var customDimensions = {
    width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };
  var dimensions = createDimensions({
    customDimensions,
  });

  // 3. Draw canvas

  const wrapper = select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  // init static elements
  bounds.append('g').attr('class', 'bins');
  bounds.append('line').attr('class', 'mean');
  bounds
    .append('g')
    .attr('class', 'x-axis')
    .style('transform', `translateY(${dimensions.boundedHeight}px)`)
    .append('text')
    .attr('class', 'x-axis-label');

  const metricAccessor = (d) => d.humidity;
  const yAccessor = (d) => d.length;

  // 4. Create scales

  const xScale = scaleLinear()
    .domain(extent(dataset, metricAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const binsGenerator = histogram()
    .domain(xScale.domain())
    .value(metricAccessor)
    .thresholds(12);

  const bins = binsGenerator(dataset);

  const yScale = scaleLinear()
    .domain([0, max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  // 5. Draw data

  const barPadding = 1;

  let binGroups = bounds.select('.bins').selectAll('.bin').data(bins);

  binGroups.exit().remove();

  const newBinGroups = binGroups.enter().append('g').attr('class', 'bin');

  newBinGroups.append('rect');
  newBinGroups.append('text');

  // update binGroups to include new points
  binGroups = newBinGroups.merge(binGroups);

  const barRects = binGroups
    .select('rect')
    .attr('x', (d) => xScale(d.x0) + barPadding)
    .attr('y', (d) => yScale(yAccessor(d)))
    .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
    .attr('width', (d) => max([0, xScale(d.x1) - xScale(d.x0) - barPadding]));

  const dataMean = mean(dataset, metricAccessor);

  const meanLine = bounds
    .selectAll('.mean')
    .attr('x1', xScale(dataMean))
    .attr('x2', xScale(dataMean))
    .attr('y1', -20)
    .attr('y2', dimensions.boundedHeight);

  // draw axes
  const xAxisGenerator = axisBottom().scale(xScale);

  const xAxis = bounds.select('.x-axis').call(xAxisGenerator);

  const xAxisLabel = xAxis
    .select('.x-axis-label')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .text('Humidity');

  // 7. Set up interactions
  var tooltip = select('#tooltip');

  // create text formatting function
  const formatHumidity = format('.2f');
  // standard convention is to use id's in JS and
  // classes in CSS
  binGroups
    .select('rect')
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave);

  function handleMouseEnter(datum) {
    tooltip.select('#count').text(yAccessor(datum));
    tooltip
      .select('#range')
      .text([formatHumidity(datum.x0), formatHumidity(datum.x1)].join('-'));

    // to calc our tooltip's x position, we need to take 3 things into account:
    // 1) the bar's x position in the chart (xScale(datum.x0))
    // 2) half of the bar's width ((xScale(datum.x1)-xScale(datum.x0))/2)
    // 3) the margin by which the bounds are shifted right (dimensions.margin.left)

    const x =
      xScale(datum.x0) +
      (xScale(datum.x1) - xScale(datum.x0)) / 2 +
      dimensions.margin.left;
    // to calc our tooltip's y position, we need add:
    // 1) the bar's y position (yScale(yAccessor(datum)))
    // 2) the margin by which our bounds are shiften down (dimensions.margin.top)

    const y = yScale(yAccessor(datum)) + dimensions.margin.top;
    // we're setting a transform CSS property rather than a 'left' and 'top'
    // value because of the performance cost.
    // A good guide is to only directly change transforma and opacity

    // We also need to take the size of the tooltip into account without the cost of
    // calling .getBoundingClientRect().
    // transform: translate() can take a percentage value for the currently specified element
    tooltip
      .style(
        'transform',
        `translate(calc(-50% + ${x}px), calc(-100% + ${y}px))`
      )
      .style('opacity', 1);
  }
  function handleMouseLeave() {
    tooltip.style('opacity', 0);
  }
}
drawBars()
  .then(function endTimer() {
    console.timeEnd('render histogram');
  })
  .catch(console.error);
