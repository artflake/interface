/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Bundles the widgets library, which is released independently of the interface application.
 * This library lives in src/lib, but shares code with the interface application.
 */
// import eslint from '@rollup/plugin-eslint'
// import babel from '@rollup/plugin-babel'
// import nodePolyfills from 'rollup-plugin-node-polyfills'

// import { getBabelOutputPlugin } from '@rollup/plugin-babel'
// import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import sass from 'rollup-plugin-scss'
import typescript from 'rollup-plugin-typescript2'
// import { DEFAULT_EXTENSIONS } from '@babel/core'
// import replace from '@rollup/plugin-replace'
// import dts from 'rollup-plugin-dts'
require('dotenv').config()
// import external from 'rollup-plugin-peer-deps-external'

// import { dependencies } from './package.json'

// const deps = Object.keys(dependencies)
// const extensions = ['.ts', '.tsx']

// const replacements = {
//   'process.env.REACT_APP_IS_WIDGET': false,
// }

// const ignore = ['styled-components']

const library = {
  external: ['@babel/runtime', '@metamask/jazzicon'],
  input: 'src/snowflake/index.ts',
  output: [
    {
      file: 'dist2/snowflake.js',
      format: 'cjs',
      inlineDynamicImports: true,
      sourcemap: false,
      // plugins: [
      //   getBabelOutputPlugin({
      //     plugins: ['macros'],
      //   }),
      // ],
    },
    {
      file: 'dist2/snowflake.esm.js',
      format: 'esm',
      inlineDynamicImports: true,
      sourcemap: false,
      plugins: [
        getBabelOutputPlugin({
          plugins: ['babel-plugin-macros'],
        }),
      ],
    },
  ],
  // necessary because some nested imports (eg jotai/*) would otherwise not resolve.
  // external: (source: string) => Boolean(deps.find((dep) => source === dep || source.startsWith(dep + '/'))),
  // external: (source: string) => ignore.includes(source),
  plugins: [
    // external(),
    // eslint({ include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'] }),
    // nodePolyfills(),
    // resolve({
    //   extensions,
    //   browser: true,
    // }),
    commonjs(),

    // replace({ ...replacements, preventAssignment: true }),
    typescript({ tsconfig: './tsconfig.json', useTsconfigDeclarationDir: false }),
    // babel({
    //   // presets: [['babel-preset-react-app/dependencies', { helpers: true }]],
    //   presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', '@lingui/babel-preset-react'],
    //   exclude: /@babel(?:\/|\\{1,2})runtime/,
    //   extensions: ['js', 'mjs', 'ts', 'tsx'],
    //   babelHelpers: 'runtime',
    //   plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime', 'macros'],
    // }),

    // commonjs({ esmExternals: true, requireReturnsDefault: false }),
    // resolve(),

    // babel({
    //   extensions: [...DEFAULT_EXTENSIONS, '.ts', 'tsx'],
    //   babelHelpers: 'runtime',
    //   exclude: 'node_modules/**',
    //   babelrc: false,
    //   skipPreflightCheck: true,
    //   presets: [
    //     [
    //       'react-app',
    //       {
    //         runtime: 'automatic',
    //         typescript: true,
    //       },
    //     ],
    //   ],
    // }),
    // commonjs({ ignore: ['node_modules/styled-components/**/*.js'] }),
    // eslint({ include: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'] }),
    json(), // imports json
    // replace({ ...replacements, preventAssignment: true }),
    url(), // imports files (including svgs) as data URIs
    svgr({ exportType: 'named', svgo: false }), // imports svgs as React components
    sass(), // imports sass styles
  ],
}

// const typings = {
//   input: 'dist2/types/snowflake.d.ts',
//   output: {
//     file: 'dist2/snowflake.d.ts',
//     format: 'es',
//   },
//   external: (source) => source.endsWith('.scss'),
//   // plugins: [dts()],
//   plugins: [dts({ compilerOptions: { baseUrl: 'dist2/types' } })],
// }

// const config = [library, typings]
// const config = [library]

export default library
