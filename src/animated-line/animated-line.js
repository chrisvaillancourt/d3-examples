import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './animated-line.css';

import { json } from 'd3-fetch';
import { timeParse, timeFormat } from 'd3-time-format';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { line } from 'd3-shape';
import { axisLeft, axisBottom } from 'd3-axis';
import { timeDay } from 'd3-time';
import { transition } from 'd3-transition';
async function drawLineChart() {
  // 1. Access data
  let dataset = await json('../data/nyc_weather_data.json');

  // 2. Create chart dimensions

  const yAccessor = (d) => d.temperatureMax;
  const dateParser = timeParse('%Y-%m-%d');
  const xAccessor = (d) => dateParser(d.date);
  dataset = dataset.sort((a, b) => xAccessor(a) - xAccessor(b)).slice(0, 100);

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  };
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

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
  // add a defs element to store our clip path
  // clip path will be used to hide line data points that are out of our bounds
  bounds
    .append('defs')
    .append('clipPath')
    .attr('id', 'bounds-clip-path')
    // clip path shape depends on it's children so we need to add
    // a rect that will cover the bounds
    .append('rect')
    .attr('width', dimensions.boundedWidth)
    .attr('height', dimensions.boundedHeight);

  // init static elements
  bounds.append('rect').attr('class', 'freezing');
  var clip = bounds.append('g').attr('clip-path', 'url(#bounds-clip-path)');

  // have our path sit inside of our new group instead of the bounds
  clip.append('path').attr('class', 'line');

  bounds.append('path').attr('class', 'line');
  bounds
    .append('g')
    .attr('class', 'x-axis')
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);
  bounds.append('g').attr('class', 'y-axis');

  const drawLine = (dataset) => {
    // 4. Create scales

    const yScale = scaleLinear()
      .domain(extent(dataset, yAccessor))
      .range([dimensions.boundedHeight, 0]);

    const freezingTemperaturePlacement = yScale(32);
    const freezingTemperatures = bounds
      .select('.freezing')
      .attr('x', 0)
      .attr('width', dimensions.boundedWidth)
      .attr('y', freezingTemperaturePlacement)
      .attr('height', dimensions.boundedHeight - freezingTemperaturePlacement);

    const xScale = scaleTime()
      // we need to ignore the first two data points when creating our xscale
      // otherwise we see the old data removed before the line shifts
      .domain(extent(dataset.slice(2), xAccessor))
      .range([0, dimensions.boundedWidth]);

    // 5. Draw data

    const lineGenerator = line()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));
    // we need to calculate how far we need to shift the line in order to animate it
    var lastTwoPoints = dataset.slice(-2);
    var pixelsBetweenLastPoints =
      xScale(xAccessor(lastTwoPoints[1])) - xScale(xAccessor(lastTwoPoints[0]));

    const linePath = bounds
      .select('.line')
      .attr('d', lineGenerator(dataset))
      // instantly shift the line to match it's old position
      //shift is invisible because we're shifting the x scale to the left by the same amount
      .style('transform', `translateX(${pixelsBetweenLastPoints}px)`)
      // animate unshifting the line to the left (it's normal position on the x axis)
      .transition()
      .duration(1000)
      .style('transform', 'none');

    // 6. Draw peripherals

    const yAxisGenerator = axisLeft().scale(yScale);

    const yAxis = bounds.select('.y-axis').call(yAxisGenerator);

    const xAxisGenerator = axisBottom().scale(xScale);

    const xAxis = bounds
      .select('.x-axis')
      .transition()
      .duration(1000)
      .call(xAxisGenerator);
  };
  drawLine(dataset);

  // update the line every 1.5 seconds
  setInterval(addNewDay, 1500);
  function addNewDay() {
    dataset = [...dataset.slice(1), generateNewDataPoint(dataset)];
    drawLine(dataset);
  }

  function generateNewDataPoint(dataset) {
    const lastDataPoint = dataset[dataset.length - 1];
    const nextDay = timeDay.offset(xAccessor(lastDataPoint), 1);

    return {
      date: timeFormat('%Y-%m-%d')(nextDay),
      temperatureMax: yAccessor(lastDataPoint) + (Math.random() * 6 - 3),
    };
  }
}
console.time('draw line');
drawLineChart().then(() => console.timeEnd('draw line'));
