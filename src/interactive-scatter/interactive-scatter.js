import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './interactive-scatter.css';
import * as d3 from 'd3';
import { Delaunay } from 'd3-delaunay';
async function drawScatter() {
  // 1. Access data

  const dataset = await d3.json('../data/nyc_weather_data.json');

  const xAccessor = (d) => d.dewPoint;
  const yAccessor = (d) => d.humidity;

  // 2. Create chart dimensions

  const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9]);
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

  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  // 4. Create scales

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const drawDots = (dataset) => {
    // 5. Draw data

    const dots = bounds.selectAll('circle').data(dataset, (d) => d[0]);

    const newDots = dots.enter().append('circle');

    const allDots = newDots
      .merge(dots)
      .attr('cx', (d) => xScale(xAccessor(d)))
      .attr('cy', (d) => yScale(yAccessor(d)))
      .attr('r', 4);

    const oldDots = dots.exit().remove();
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

  const xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);

  const xAxisLabel = xAxis
    .append('text')
    .attr('class', 'x-axis-label')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .html('dew point (&deg;F)');

  const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(4);

  const yAxis = bounds.append('g').call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append('text')
    .attr('class', 'y-axis-label')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)
    .text('relative humidity');

  // 7. Set up interactions
  var tooltip = d3.select('#tooltip');
  var formatHumidity = d3.format('.2f');
  var formatDewPoint = d3.format('.2f');
  var dateParser = d3.timeParse('%Y-%m-%d');
  var formatDate = d3.timeFormat('%B %A %-d, %Y');
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
    d3.selectAll('.tooltipDot').remove();
  }
}
drawScatter();
