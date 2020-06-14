function createDimensions({ customDimensions = {} } = {}) {
  // Used to create a dimensions data obj for creating chart dimensions.
  // Pass customDimesions to return an obj with extra key/value pairs.
  return {
    margin: {
      top: 90,
      right: 90,
      bottom: 50,
      left: 50,
    },
    get width() {
      return (window.innerWidth - this.margin.left - this.margin.right) * 0.75;
    },
    get boundedWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    get height() {
      return this.width;
    },
    get boundedHeight() {
      return this.height - this.margin.top - this.margin.bottom;
    },
    ...customDimensions,
  };
}

export { createDimensions };
