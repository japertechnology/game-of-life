const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const postcss = require('rollup-plugin-postcss');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: 'style.css',
      minimize: true,
      sourceMap: true
    }),
    terser()
  ]
};
