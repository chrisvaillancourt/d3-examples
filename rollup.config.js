// import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// Builds based on environment
// const OUTPUT =
//   process.env.BUILD === 'development' ? 'output/dev' : 'output/dist';
const OUTPUT = 'public';
const SOURCEMAP = process.env.BUILD === 'development' ? 'inline' : false;
const MINIFY = process.env.BUILD === 'development' ? null : terser();
const SERVER =
  process.env.BUILD === 'development'
    ? [serve(OUTPUT), livereload(OUTPUT)]
    : [];

export default {
  input: {
    'scatter/index': './src/scatterplot/scatter.js',
    'barchart/index': './src/bar-chart/barchart.js',
  },
  output: {
    dir: OUTPUT,
    format: 'esm',
    sourcemap: SOURCEMAP,
    entryFileNames: '[name].js',
  },
  plugins: [
    del({ targets: OUTPUT }),
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    MINIFY,
    postcss({
      extensions: ['.css'],
      extract: true,
      minimize: true,
    }),

    // copy({
    //   targets: [
    //     { src: 'src/bar-chart/index.html', dest: `${OUTPUT}/bar-chart/` },
    //     { src: 'src/scatterplot/index.html', dest: `${OUTPUT}/scatterplot/` },
    //   ],
    // }),
    ...SERVER,
  ],
};
