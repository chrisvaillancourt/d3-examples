import './scatterplot.css';
import * as d3 from 'd3';
async function drawScatter() {
  // step 1) access chart data
  let data = await d3.json('../data/nyc_weather_data.json');
  // create accessor functions
  function xAccessor(d) {
    return d.dewPoint;
  }
  function yAccessor(d) {
    return d.humidity;
  }
  function colorAccessor(d) {
    return d.cloudCover;
  }

  // step 2) create chart dimensions
  // we want to make the chart square so we can
  // use d3.min to get the smaller of the height or width
  function createDimensions() {
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
    return dimensions;
  }

  const dimensions = createDimensions();

  // step 3) Draw canvas
  function drawCanvas({ wrapperSelector, chartDimensions }) {
    const wrapper = d3
      .select(wrapperSelector)
      .append('svg')
      .attr('width', chartDimensions.width)
      .attr('height', chartDimensions.height);

    const bounds = wrapper
      .append('g')
      .style(
        'transform',
        `translate(${chartDimensions.margin.left}px, ${chartDimensions.margin.top}px)`
      );

    return bounds;
  }

  const bounds = drawCanvas({
    wrapperSelector: '#wrapper',
    chartDimensions: dimensions,
  });

  // step 4) Create scales

  function createScale({ chartData, dataAccessor, range, isNice }) {
    const scale = d3
      .scaleLinear()
      .domain(d3.extent(chartData, dataAccessor))
      .range(range);
    if (isNice) scale.nice();
    return scale;
  }

  const xScale = createScale({
    chartData: data,
    dataAccessor: xAccessor,
    range: [dimensions.boundedHeight, 0],
    isNice: true,
  });

  const yScale = createScale({
    chartData: data,
    dataAccessor: yAccessor,
    range: [0, dimensions.boundedWidth],
    isNice: true,
  });
  const colorScale = createScale({
    chartData: data,
    dataAccessor: colorAccessor,
    range: ['skyblue', 'darkslategrey'],
    isNice: false,
  });

  // step 5) Draw data

  // const dots = bounds.selectAll('circle')
  //   .data(data)
  //   .enter().append('circle')
  //   .attr('cx', (d) => xScale(xAccessor(d))) // any attribute values that are functions will be passed each data point individually
  //   .attr('cy', (d) => yScale(yAccessor(d)))
  //   .attr('r', 5)
  //   .attr('fill', 'cornflowerblue');

  // draw with .join() method

  function drawCircles({
    chartBounds,
    chartData,
    chartXScale,
    dataXAccessor,
    chartYScale,
    dataYAccessor,
    fillScale,
    fillAccessor,
  }) {
    const dots = chartBounds.selectAll('circle').data(chartData);
    dots
      .join('circle')
      .attr('cx', (d) => chartXScale(dataXAccessor(d)))
      .attr('cy', (d) => chartYScale(dataYAccessor(d)))
      .attr('r', 5)
      .attr('fill', (d) => fillScale(fillAccessor(d)));
  }

  drawCircles({
    chartBounds: bounds,
    chartData: data,
    chartXScale: xScale,
    dataXAccessor: xAccessor,
    chartYScale: yScale,
    dataYAccessor: yAccessor,
    fillScale: colorScale,
    fillAccessor: colorAccessor,
  });

  // step 6) Draw peripherals

  function drawXAxis() {
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
  }

  function drawYAxis() {
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

  drawXAxis();
  drawYAxis();
}
drawScatter();
