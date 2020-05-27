import './style.css';
async function drawScatter() {
  // your code goes here
  // step 1) access chart data
  const data = await d3.json('../../data/nyc_weather_data.json');
  // create accessor functions
  function xAccessor(d) {
    return d.dewPoint;
  }
  function yAccessor(d) {
    return d.humidity;
  }

  // step 2) create chart dimensions
  // we want to make the chart square so we can
  // use d3.min to get the smaller of the height or width
  const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9]);
  const dimensions = {
    width,
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

  // step 3) Draw canvas
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

  // step 4) Create scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.boundedHeight, 0]) // invert range to make axis go bottom -> top
    .nice();

  // step 5) Draw data
  // draw with .join() method
  const dots = bounds.selectAll('circle').data(data);
  dots
    .join('circle')
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .attr('r', 5)
    .attr('fill', 'cornflowerblue');

  // step 6) Draw peripherals
  const xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);

  const xAxisLabel = xAxis
    .append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .html('Dew Point (&deg;F)');
  const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(4);

  const yAxis = bounds.append('g').call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append('text')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .style('transform', 'rotate(-90deg')
    .style('text-anchor', 'middle')
    .text('Relative Humidity');
}
drawScatter();
