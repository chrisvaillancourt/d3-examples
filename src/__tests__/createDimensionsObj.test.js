import { createDimensions } from '../utils/createDimensions';

test(' create chart dimensions object', () => {
  var obj = createDimensions({
    customDimensions: {
      histogramMargin: 10,
      histogramHeight: 70,
    },
  });

  expect(obj.margin).toBeDefined();
  expect(obj.margin.top).toBeDefined();
  expect(obj.margin.right).toBeDefined();
  expect(obj.margin.bottom).toBeDefined();
  expect(obj.margin.left).toBeDefined();
  expect(obj.width).toBeDefined();
  expect(obj.boundedWidth).toBeDefined();
  expect(obj.height).toBeDefined();
  expect(obj.boundedHeight).toBeDefined();
  expect(obj.histogramHeight).toEqual(70);
  expect(obj.histogramMargin).toEqual(10);
});
