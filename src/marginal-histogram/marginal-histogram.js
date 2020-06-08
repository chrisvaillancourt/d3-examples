import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './marginal-histogram.css';
import { json } from 'd3-fetch';
import { min, extent } from 'd3-array';
import { select, selectAll, classed } from 'd3-selection';
import { scaleLinear, scaleSequential } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { Delaunay } from 'd3-delaunay';
import { timeFormat, timeParse } from 'd3-time-format';
import { interpolateRainbow } from 'd3-scale-chromatic';

console.time('render chart');
async function drawScatter() {
  // 1. Access data

  const dataset = await json('../data/nyc_weather_data.json');

  const xAccessor = (d) => d.temperatureMin;
  const yAccessor = (d) => d.temperatureMax;
  // use a standard date to normalize our data with.
  // We'll do this in-case our data spans multiple years
  // allowing us to color the dots by the day/month
  const colorScaleYear = 2000;
  var parseDate = timeParse('%Y-%m-%d');
  function colorAccessor(d) {
    return parseDate(d.date).setYear(colorScaleYear);
  }
  // 2. Create chart dimensions

  const width = min([window.innerWidth * 0.9, window.innerHeight * 0.9]);
  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
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
  var boundsBackground = bounds
    .append('rect')
    .classed('bounds-background', true)
    .attr('x', 0)
    .attr('width', dimensions.boundedWidth)
    .attr('y', 0)
    .attr('height', dimensions.boundedHeight);

  // 4. Create scales

  // find the smallest min temp and largest max temp
  // we'll use the extent as the domain for both x & y axis
  var tempsExtent = extent([
    ...dataset.map(xAccessor),
    ...dataset.map(yAccessor),
  ]);

  const xScale = scaleLinear()
    .domain(tempsExtent)
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(tempsExtent)
    .range([dimensions.boundedHeight, 0])
    .nice();
  // use a sequential scale to cover the entire year

  var colorScale = scaleSequential()
    .domain([
      timeParse('%m/%d/%Y')(`1/1/${colorScaleYear}`),
      timeParse('%m/%d/%Y')(`12/31/${colorScaleYear}`),
    ])
    .interpolator(function invertDate(d) {
      // flip the value to better correspond with season colors
      return interpolateRainbow(-d);
    });

  const drawDots = (dataset) => {
    // 5. Draw data
    var dotsGroup = bounds.append('g');
    const dots = dotsGroup
      .selectAll('.dot')
      .data(dataset, (d) => d[0])
      .join('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(xAccessor(d)))
      .attr('cy', (d) => yScale(yAccessor(d)))
      .attr('r', 4)
      .style('fill', function setFill(d) {
        return colorScale(colorAccessor(d));
      });
  };
  drawDots(dataset);
  // create a new Delaunay triangulation for interaction
  var delaunay = Delaunay.from(
    dataset,
    (d) => xScale(xAccessor(d)),
    (d) => yScale(yAccessor(d))
  );

  // turn the delaunay triangulation into a voronoi diagram
  var voronoi = delaunay.voronoi();

  // specify bounds size
  voronoi.xmax = dimensions.boundedWidth;
  voronoi.ymax = dimensions.boundedHeight;

  bounds
    .selectAll('.voronoi')
    .data(dataset)
    .enter()
    .append('path')
    .attr('class', 'voronoi')
    .attr('d', function createPath(d, i) {
      // create each path's d attribute string by passing voronoi.randerCell() the index
      // of our data point
      return voronoi.renderCell(i);
    });

  // 6. Draw peripherals

  const xAxisGenerator = axisBottom().scale(xScale);

  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);

  const xAxisLabel = xAxis
    .append('text')
    .attr('class', 'x-axis-label')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .html('Minimum Temperature (&deg;F)');

  const yAxisGenerator = axisLeft().scale(yScale).ticks(4);

  const yAxis = bounds.append('g').call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append('text')
    .attr('class', 'y-axis-label')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)
    .text('Maximum Temperature (&deg;F)');

  // 7. Set up interactions
  var tooltip = select('#tooltip');
  var formatHumidity = format('.2f');
  var formatDewPoint = format('.2f');
  var dateParser = timeParse('%Y-%m-%d');
  var formatDate = timeFormat('%B %A %-d, %Y');
  bounds
    .selectAll('.voronoi')
    .on('mouseenter', handleMouseEnter)
    .on('mouseleave', handleMouseLeave);

  function handleMouseEnter(datum, index) {
    tooltip.select('#humidity').text(formatHumidity(yAccessor(datum)));
    tooltip.select('#dew-point').text(formatDewPoint(xAccessor(datum)));
    tooltip.select('#date').text(formatDate(dateParser(datum.date)));
    // get x and y value of the dot, offset by top and left margins
    const x = xScale(xAccessor(datum)) + dimensions.margin.left;
    const y = yScale(yAccessor(datum)) + dimensions.margin.top;

    tooltip
      .style(
        'transform',
        `translate(calc(-50% + ${x}px), calc(-100% + ${y}px))`
      )
      .style('opacity', 1);

    // draw new dot to appear on top
    var dayDot = bounds
      .append('circle')
      .attr('class', 'tooltipDot')
      .attr('cx', xScale(xAccessor(datum)))
      .attr('cy', yScale(yAccessor(datum)))
      .attr('r', 7)
      .style('fill', 'maroon')
      .style('pointer-events', 'none');
  }
  function handleMouseLeave() {
    tooltip.style('opacity', 0);
    selectAll('.tooltipDot').remove();
  }
}
drawScatter().then(() => console.timeEnd('render chart'));
