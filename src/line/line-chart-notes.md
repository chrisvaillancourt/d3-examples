# Line Chart Notes

## Questions to ask when creating

- 'what granularity do you want to see?'
  - Noisy data can make it difficult to see trends. Corse data can hide important outliers
- 'How smooth should the line be?'
  - If you need to know the exact points on a timeline, keep the default linear interpolation of `d3.line()`
  - A smooth line can help show the bigger picture of the data.
  - You can change the interpolation by passing them to `d3.line().curve()` ([API](https://github.com/d3/d3-shape/blob/v1.3.7/README.md#curves))
  - `curveMonotoneX()` is a good choice because it goes through each point in the dataset
