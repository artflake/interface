require('dotenv').config()

module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          // Allow importing core-js in entrypoint and use browserlist to select polyfills
          // useBuiltIns: false,
          modules: false,
          // Set the corejs version we are using to avoid warnings in console
          // This will need to change once we upgrade to corejs@3
          // corejs: 3,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      [require('@babel/preset-react').default, { runtime: 'automatic' }],
      [require('@babel/preset-typescript').default],
    ],
    plugins: [
      require('babel-plugin-macros'),
      [require('@babel/plugin-proposal-decorators').default, false],
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true,
        },
      ],
      [
        require('@babel/plugin-proposal-private-methods').default,
        {
          loose: true,
        },
      ],
      [
        require('@babel/plugin-proposal-private-property-in-object').default,
        {
          loose: true,
        },
      ],
      require('@babel/plugin-proposal-numeric-separator').default,
      [
        require('babel-plugin-transform-react-remove-prop-types').default,
        {
          removeImport: true,
        },
      ],
      require('@babel/plugin-proposal-optional-chaining').default,
      require('@babel/plugin-proposal-nullish-coalescing-operator').default,
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            hooks: './src/hooks',
            components: './src/components',
            theme: './src/theme',
            state: './src/state',
            constants: './src/constants',
            abis: './src/abis',
            utils: './src/utils',
          },
        },
      ],
    ],
    overrides: [
      {
        test: /\.tsx?$/,
        plugins: [[require('@babel/plugin-proposal-decorators').default, { legacy: true }]],
      },
    ],
  }
}
