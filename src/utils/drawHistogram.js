import { extent, histogram } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { area, curveBasis } from 'd3-shape';

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

export { drawHistogram };
