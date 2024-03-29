import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './line.css';
import * as d3 from 'd3';

async function drawLineChart() {
  // 1. Access data

  let dataset = await d3.json('../data/nyc_weather_data.json');
  const yAccessor = (d) => d.temperatureMax;
  const dateParser = d3.timeParse('%Y-%m-%d');
  const xAccessor = (d) => dateParser(d.date);
  dataset = dataset.sort((a, b) => xAccessor(a) - xAccessor(b)).slice(0, 100);

  // 2. Create chart dimensions

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

  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
    );

  bounds
    .append('defs')
    .append('clipPath')
    .attr('id', 'bounds-clip-path')
    .append('rect')
    .attr('width', dimensions.boundedWidth)
    .attr('height', dimensions.boundedHeight);

  const clip = bounds.append('g').attr('clip-path', 'url(#bounds-clip-path)');

  // 4. Create scales

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);

  const freezingTemperaturePlacement = yScale(32);
  const freezingTemperatures = clip
    .append('rect')
    .attr('class', 'freezing')
    .attr('x', 0)
    .attr('width', d3.max([0, dimensions.boundedWidth]))
    .attr('y', freezingTemperaturePlacement)
    .attr(
      'height',
      d3.max([0, dimensions.boundedHeight - freezingTemperaturePlacement])
    );

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth]);

  // 5. Draw data

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  const line = clip
    .append('path')
    .attr('class', 'line')
    .attr('d', lineGenerator(dataset));

  // 6. Draw peripherals

  const yAxisGenerator = d3.axisLeft().scale(yScale);

  const yAxis = bounds.append('g').attr('class', 'y-axis').call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append('text')
    .attr('class', 'y-axis-label')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)
    .html('Minimum Temperature (&deg;F)');

  const xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = bounds
    .append('g')
    .attr('class', 'x-axis')
    .style('transform', `translateY(${dimensions.boundedHeight}px)`)
    .call(xAxisGenerator);

  // 7. Set up interactions

  // Instead of catching hover events for individual chart elements,
  // we want to display a tooltip whenever a user is hovering on the chart.
  // So, we'll want an element that spans the entire bounds.
  // We'll then listen for move events instead of enter events

  // we don't need to specify the rect's x or y values because they
  // default to 0
  var listeningRect = bounds
    .append('rect')
    .attr('class', 'listening-rect')
    .attr('width', dimensions.boundedWidth)
    .attr('height', dimensions.boundedHeight)
    .on('mousemove', handleMouseMove)
    .on('mouseleave', handleMouseLeave);

  var formatDate = d3.timeFormat('%B %A %-d, %Y');
  var tooltip = d3.select('#tooltip');

  var tooltipCircle = bounds
    .append('circle')
    .attr('r', 4)
    .attr('stroke', '#af9358')
    .attr('fill', 'white')
    .attr('stroke-width', 2)
    .style('opacity', 0);
  function formatTemperature(d) {
    return `${d3.format('.1f')(d)}°F`;
  }
  function handleMouseMove() {
    // during the d3 event, we get access to a mouse() method
    // which returns the x,y coordinates of the mouse event, relative to a
    // specified container
    var mousePosition = d3.mouse(this);

    // we need to also know which point we're closest to
    // scale functions have an invert() method to convert range values to domain values
    var hoveredDate = xScale.invert(mousePosition[0]);

    // we can use d3.scan() to find out where a variable fits in a sorted list
    // scan() takes an array (our dataset) and an optional comparator function
    var closestIndex = d3.scan(dataset, function (a, b) {
      return getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b);
    });
    var closestDataPoint = dataset[closestIndex];
    var closestXValue = xAccessor(closestDataPoint);
    var closestYValue = yAccessor(closestDataPoint);

    tooltip.select('#date').text(formatDate(closestXValue));
    // use .html() to ensure formatting with ° sign
    tooltip.select('#temperature').html(formatTemperature(closestYValue));
    var x = xScale(closestXValue) + dimensions.margin.left;
    var y = yScale(closestYValue) + dimensions.margin.top;

    tooltip
      .style(
        'transform',
        `translate(calc(-50% + ${x}px), calc(-100% + ${y}px))`
      )
      .style('opacity', 1);
    tooltipCircle
      .attr('cx', xScale(closestXValue))
      .attr('cy', yScale(closestYValue))
      .attr('opacity', 1);
    // ! NOTE: if importing a version of d3-array > 1.0, replace d3.scan with d3.leastIndex()
    function getDistanceFromHoveredDate(d) {
      // calc distance between hovered point and a data point
      return Math.abs(xAccessor(d) - hoveredDate);
    }
  }
  function handleMouseLeave() {
    tooltip.style('opacity', 0);
    tooltipCircle.style('opacity', 1);
  }
}
drawLineChart();
