import '../assets/styles/new.css';
import '../assets/styles/base.css';
import '../assets/styles/breadcrumb-nav.css';
import './marginal-histogram.css';
import { json } from 'd3-fetch';
import { min, extent, histogram, range, median } from 'd3-array';
import { select, selectAll, mouse } from 'd3-selection';
import { scaleLinear, scaleSequential } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { Delaunay } from 'd3-delaunay';
import { timeFormat, timeParse } from 'd3-time-format';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { area, curveBasis } from 'd3-shape';
// import { drawHistogram } from '../utils/drawHistogram';
import { createDimensions } from '../utils/createDimensions';
import { transition } from 'd3-transition';
console.time('render chart');
async function drawScatter() {
  // 1. Access data

  const dataset = await json('../data/nyc_weather_data.json');
  function xAccessor(d) {
    return d.temperatureMin;
  }
  function yAccessor(d) {
    return d.temperatureMax;
  }
  // use a standard date to normalize our data with.
  // We'll do this in-case our data spans multiple years
  // allowing us to color the dots by the day/month
  const colorScaleYear = 2000;
  var parseDate = timeParse('%Y-%m-%d');
  function colorAccessor(d) {
    return parseDate(d.date).setYear(colorScaleYear);
  }
  // 2. Create chart dimensions
  var dimensions = createDimensions({
    customDimensions: {
      histogramMargin: 10,
      histogramHeight: 70,
      legendWidth: 250,
      legendHeight: 26,
    },
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

  // const drawDots = (dataset) => {
  //   // 5. Draw data
  //   var dotsGroup = bounds.append('g');
  //   const dots = dotsGroup
  //     .selectAll('.dot')
  //     .data(dataset, (d) => d[0])
  //     .join('circle')
  //     .attr('class', 'dot')
  //     .attr('cx', (d) => xScale(xAccessor(d)))
  //     .attr('cy', (d) => yScale(yAccessor(d)))
  //     .attr('r', 4)
  //     .style('fill', function setFill(d) {
  //       return colorScale(colorAccessor(d));
  //     });
  // };
  // 5. Draw data
  var dotsGroup = bounds.append('g');
  var dots = dotsGroup
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

  function drawHistogram({
    data,
    scale,
    accessor,
    dimensions,
    histogramClass,
    chartTransform,
    chartBounds,
    pathClass,
  }) {
    var histogramGenerator = histogram()
      .domain(scale.domain())
      .value(accessor)
      .thresholds(20);
    var histogramBins = histogramGenerator(data);
    var histogramYScale = scaleLinear()
      .domain(extent(histogramBins, (d) => d.length))
      .range([dimensions.histogramHeight, 0]);
    var histogramBounds = chartBounds
      .append('g')
      .attr('class', histogramClass)
      .style('transform', chartTransform);
    var histogramLineGenerator = area()
      .x((d) => scale((d.x0 + d.x1) / 2))
      .y0(dimensions.histogramHeight)
      .y1((d) => histogramYScale(d.length))
      .curve(curveBasis);
    var histogramElement = histogramBounds
      .append('path')
      .attr('d', (d) => histogramLineGenerator(histogramBins))
      .attr('class', pathClass);
  }

  var rightHistogramGenerator = histogram()
    .domain(yScale.domain())
    .value(yAccessor)
    .thresholds(20);
  var rightHistogramBins = rightHistogramGenerator(dataset);
  var rightHistogramYScale = scaleLinear()
    .domain(extent(rightHistogramBins, (d) => d.length))
    .range([dimensions.histogramHeight, 0]);
  var rightHistogramBounds = bounds
    .append('g')
    .attr('class', 'right-histogram')
    .style(
      'transform',
      `translate(
        ${dimensions.boundedWidth + dimensions.histogramMargin}px, -${
        dimensions.histogramHeight
      }px) rotate(90deg)`
    );
  var rightHistogramLineGenerator = area()
    .x((d) => yScale((d.x0 + d.x1) / 2))
    .y0(dimensions.histogramHeight)
    .y1((d) => rightHistogramYScale(d.length))
    .curve(curveBasis);
  var rightHistogramElement = rightHistogramBounds
    .append('path')
    .attr('d', (d) => rightHistogramLineGenerator(rightHistogramBins))
    .attr('class', 'histogram-area');

  // drawHistogram({
  //   data: dataset,
  //   scale: yScale,
  //   accessor: yAccessor,
  //   chartBounds: bounds,
  //   dimensions,
  //   histogramClass: 'right-histogram',
  //   pathClass: 'histogram-area',
  //   chartTransform: `translate(
  //       ${dimensions.boundedWidth + dimensions.histogramMargin}px, -${
  //     dimensions.histogramHeight
  //   }px) rotate(90deg)`,
  // });

  drawHistogram({
    data: dataset,
    scale: xScale,
    accessor: xAccessor,
    chartBounds: bounds,
    dimensions,
    histogramClass: 'top-histogram',
    pathClass: 'histogram-area',
    chartTransform: `translate(0px, ${
      -dimensions.histogramHeight - dimensions.histogramMargin
    }px)`,
  });
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
    .html('Maximum Temperature (&deg;F)');

  var legendGroup = bounds.append('g').attr(
    'transform',
    `translate(
      ${dimensions.boundedWidth - dimensions.legendWidth - 9},
      ${dimensions.boundedHeight - 37})`
  );

  var defs = wrapper.append('defs');
  const numberOfGradientStops = 10;
  // create an array of desired number of stops and normalize indices to go up to 1;
  var stops = range(numberOfGradientStops).map(
    (i) => i / (numberOfGradientStops - 1)
  );
  const legendGradientId = 'legend-gradient';
  var gradient = defs
    .append('linearGradient')
    .attr('id', legendGradientId)
    .selectAll('stop')
    .data(stops)
    .enter()
    .append('stop')
    .attr('stop-color', (d) => interpolateRainbow(-d))
    .attr('offset', (d) => `${d * 100}%`);

  var legendGradient = legendGroup
    .append('rect')
    .attr('height', dimensions.legendHeight)
    .attr('width', dimensions.legendWidth)
    .style('fill', `url(#${legendGradientId})`);

  // create an array of key dates
  var tickValues = [
    timeParse('%m/%d/%Y')(`4/1/${colorScaleYear}`),
    timeParse('%m/%d/%Y')(`7/1/${colorScaleYear}`),
    timeParse('%m/%d/%Y')(`10/1/${colorScaleYear}`),
  ];

  var legendTickScale = scaleLinear()
    .domain(colorScale.domain())
    .range([0, dimensions.legendWidth]);

  var legendValues = legendGroup
    .selectAll('.legend-value')
    .data(tickValues)
    .enter()
    .append('text')
    .attr('class', 'legend-value')
    .attr('x', legendTickScale)
    .attr('y', -6)
    .text(timeFormat('%b'));

  var legendValueTicks = legendGroup
    .selectAll('.legend-tick')
    .data(tickValues)
    .enter()
    .append('line')
    .attr('class', 'legend-tick')
    .attr('x1', legendTickScale)
    .attr('x2', legendTickScale)
    .attr('y1', 6);

  // 7. Set up interactions
  var tooltip = select('#tooltip');
  var formatMetric = format('.2f');
  var dateParser = timeParse('%Y-%m-%d');
  var formatDate = timeFormat('%B %A %-d, %Y');

  var hoverElementsGroup = bounds.append('g').attr('opacity', 0);

  var dayDot = hoverElementsGroup.append('circle').attr('class', 'tooltip-dot');

  bounds
    .selectAll('.voronoi')
    .on('mouseenter', handleVoronoiMouseEnter)
    .on('mouseleave', handleVoronoiMouseLeave);

  // we need to use a rect instead of a <line> because a line's x1 & x2 attributes won't respect CSS transitions
  // but a path's d attribute will
  var horizontalLine = hoverElementsGroup
    .append('rect')
    .attr('class', 'hover-line');
  var verticalLine = hoverElementsGroup
    .append('rect')
    .attr('class', 'hover-line');

  legendGradient
    .on('mousemove', handleLegendMouseMove)
    .on('mouseleave', handleLegendMouseLeave);

  const legendHighlightBarWidth = dimensions.legendWidth * 0.05;
  var legendHighlightGroup = legendGroup.append('g').attr('opacity', 0);
  var legendHighlightBar = legendHighlightGroup
    .append('rect')
    .attr('class', 'legend-highlight-bar')
    .attr('width', legendHighlightBarWidth)
    .attr('height', dimensions.legendHeight);

  // we need to shift the text by half the bar width
  // this lets us center the text with the bar
  var legendHighlightText = legendHighlightGroup
    .append('text')
    .attr('class', 'legend-highlight-text')
    .attr('x', legendHighlightBarWidth / 2)
    .attr('y', -6);

  function handleLegendMouseMove() {
    // we need to determine which dates the mouse is hovering over
    // we can determine the hover point with the mouse's x position relative to the legend
    // mouse() can give us [x,y] coordinates
    // the coordinates are relative to the element passed to mouse()
    // 'this' is the element that the mouse event was initialzed on

    const [x] = mouse(this);

    // use a scale's invert method to go from range dimension -> domain dimension
    const minDateToHighlight = new Date(
      legendTickScale.invert(x - legendHighlightBarWidth)
    );
    const maxDateToHighlight = new Date(
      legendTickScale.invert(x + legendHighlightBarWidth)
    );
    // if we use the raw x position of the mouse, it could go out of bounds when we approach
    // the left or right side.
    // we can use median to bound the value
    // There are three outcomes when we pass an array of [min, value, max]:
    // 1) the value is lower than the min, resulting in the sorted array [value, min, max], making min the middle value
    // 2) the value is between the min and the max, resulting in the sorted array [min,value, max], making min the middle value
    // 3) the value is higher than the max, resulting in the sorted array [min, max, value], making max the middle value
    const barX = median([
      0,
      x - legendHighlightBarWidth / 2,
      dimensions.legendWidth - legendHighlightBarWidth,
    ]);
    legendHighlightGroup
      .style('opacity', 1)
      .style('transform', `translateX(${barX}px)`);
    legendHighlightText
      .text([
        timeFormat('%b %d')(minDateToHighlight),
        timeFormat('%b %d')(maxDateToHighlight),
      ])
      .join('-');
    // dim normal legend ticks
    legendValues.style('opacity', 0);
    legendValueTicks.style('opacity', 0);

    dots.transition().duration(100).style('opacity', 0.08).attr('r', 2);

    var relevantDots = dots
      .filter(isDayWithinRange)
      .transition()
      .duration(100)
      .style('opacity', 1)
      .attr('r', 5);

    function getYear(d) {
      return +timeFormat('%Y')(d);
    }
    function isDayWithinRange(d) {
      // we want to highlight dates on each edge when we get close to the edge
      var date = colorAccessor(d);
      if (getYear(minDateToHighlight) < colorScaleYear) {
        // if dates wrap around to the previous year
        // check if the date is after the min date
        return (
          date >= new Date(minDateToHighlight).setYear(colorScaleYear) ||
          date <= maxDateToHighlight
        );
      } else if (getYear(maxDateToHighlight) > colorScaleYear) {
        // if dates wrap around to next year
        // check if the date is before the max date
        return (
          date <= new Date(maxDateToHighlight).setYear(colorScaleYear) ||
          date >= minDateToHighlight
        );
      } else {
        return date >= minDateToHighlight && date <= maxDateToHighlight;
      }
    }
  }

  function handleLegendMouseLeave() {
    dots.transition().duration(500).style('opacity', 1).attr('r', 4);

    legendHighlightGroup.style('opacity', 0);
    legendValues.style('opacity', 1);
    legendValueTicks.style('opacity', 1);
  }

  function handleVoronoiMouseEnter(datum, index) {
    tooltip.select('#min-temperature').text(formatMetric(xAccessor(datum)));
    tooltip.select('#max-temperature').text(formatMetric(yAccessor(datum)));
    tooltip.select('#date').text(formatDate(dateParser(datum.date)));
    // get x and y value of the dot, offset by top and left margins
    const x = xScale(xAccessor(datum));
    const y = yScale(yAccessor(datum));
    const tooltipX = x + dimensions.margin.left;
    const tooltipY = y + dimensions.margin.top - 4; // adjust 4px to prevent overlap with circle

    tooltip
      .style(
        'transform',
        `translate(calc(-50% + ${tooltipX}px), calc(-100% + ${tooltipY}px))`
      )
      .style('opacity', 1);

    dayDot
      .attr('cx', xScale(xAccessor(datum)))
      .attr('cy', yScale(yAccessor(datum)))
      .attr('r', 7);

    const hoverLineThickness = 10;

    horizontalLine
      .attr('x', x)
      .attr('y', y - hoverLineThickness / 2)
      .attr(
        'width',
        dimensions.boundedWidth +
          dimensions.histogramMargin +
          dimensions.histogramHeight -
          x
      )
      .attr('height', hoverLineThickness);

    verticalLine
      .attr('x', x - hoverLineThickness / 2)
      .attr('y', -dimensions.histogramMargin - dimensions.histogramHeight)
      .attr('width', hoverLineThickness)
      .attr(
        'height',
        y + dimensions.histogramMargin + dimensions.histogramHeight
      );

    hoverElementsGroup.style('opacity', 1);
    // draw new dot to appear on top
  }
  function handleVoronoiMouseLeave() {
    tooltip.style('opacity', 0);
    hoverElementsGroup.style('opacity', 0);
    // selectAll('.tooltip-dot').remove();
  }
}
drawScatter()
  .then(() => console.timeEnd('render chart'))
  .catch(console.error);
