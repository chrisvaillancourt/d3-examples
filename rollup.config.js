import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import livereload from 'rollup-plugin-livereload';
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
    ? [serve(OUTPUT), livereload(OUTPUT)]
    : [];

export default {
  input: {
    'scatterplot/scatterplot': './src/scatterplot/scatterplot.js',
    'histogram/histogram': './src/histogram/histogram.js',
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
      minimize: false,
      url: {
        publicPath: '../assets/',
      },
    }),
    copy({
      targets: [
        {
          src: 'src/scatterplot/index.html',
          dest: `dist/scatterplot/`,
        },
        {
          src: 'src/histogram/index.html',
          dest: `dist/histogram/`,
        },
        { src: 'src/data', dest: 'dist/' },
      ],
    }),
    // ...SERVER,
  ],
};
// export default [{
//   input: 'main-a.js',
//   output: {
//     file: 'dist/bundle-a.js',
//     format: 'cjs'
//   }
// }, {
//   input: 'main-b.js',
//   output: [
//     {
//       file: 'dist/bundle-b1.js',
//       format: 'cjs'
//     },
//     {
//       file: 'dist/bundle-b2.js',
//       format: 'es'
//     }
//   ]
// }];
