import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import browsersync from 'rollup-plugin-browsersync';
import styles from 'rollup-plugin-styles';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Builds based on environment
// const OUTPUT =
//   process.env.BUILD === 'development' ? 'output/dev' : 'output/dist';

const OUTPUT = 'dist';
const SOURCEMAP = process.env.BUILD === 'development' ? 'inline' : false;
const MINIFY = process.env.BUILD === 'development' ? null : terser();
const SERVER =
  process.env.BUILD === 'development'
    ? [serve(OUTPUT), browsersync({ server: OUTPUT })]
    : [];
const minifyCss = process.env.BUILD === 'development' ? false : true;

export default {
  input: {
    index: './src/index.js',
    'scatterplot/scatterplot': './src/scatterplot/scatterplot.js',
    'histogram/histogram': './src/histogram/histogram.js',
    'animated-line/animated-line': './src/animated-line/animated-line.js',
    'line/line': './src/line/line.js',
    'interactive-scatter/interactive-scatter':
      './src/interactive-scatter/interactive-scatter.js',
    'svg-world-map/svg-world-map': './src/svg-world-map/svg-world-map.js',
    'heatmap/heatmap': 'src/heatmap/heatmap.js',
    'marginal-histogram/marginal-histogram':
      'src/marginal-histogram/marginal-histogram.js',
    'radar-weather-chart/radar-weather-chart':
      'src/radar-weather-chart/radar-weather-chart.js',
    'animated-sankey-diagram/animated-sankey-diagram':
      'src/animated-sankey-diagram/animated-sankey-diagram.js',
  },
  output: {
    dir: OUTPUT,
    format: 'esm',
    sourcemap: SOURCEMAP,
    entryFileNames: '[name].js',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    del({ targets: OUTPUT }),
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    MINIFY,
    styles({
      mode: 'extract',
      minimize: minifyCss,
      url: {
        publicPath: '../assets/',
      },
    }),
    copy({
      targets: [
        {
          src: 'src/index.html',
          dest: `dist/`,
        },
        {
          src: 'src/scatterplot/index.html',
          dest: `dist/scatterplot/`,
        },
        {
          src: 'src/histogram/index.html',
          dest: `dist/histogram/`,
        },
        { src: 'src/data', dest: 'dist/' },
        {
          src: 'src/animated-line/index.html',
          dest: `dist/animated-line/`,
        },
        {
          src: 'src/line/index.html',
          dest: `dist/line/`,
        },
        {
          src: 'src/interactive-scatter/index.html',
          dest: `dist/interactive-scatter/`,
        },
        {
          src: 'src/svg-world-map/index.html',
          dest: 'dist/svg-world-map/',
        },
        {
          src: 'src/heatmap/index.html',
          dest: 'dist/heatmap/',
        },
        {
          src: 'src/marginal-histogram/index.html',
          dest: 'dist/marginal-histogram/',
        },
        {
          src: 'src/radar-weather-chart/index.html',
          dest: 'dist/radar-weather-chart/',
        },
        {
          src: 'src/animated-sankey-diagram/index.html',
          dest: 'dist/animated-sankey-diagram/',
        },
      ],
    }),
    ...SERVER,
  ],
};
