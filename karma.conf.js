// Karma configuration
// Generated on Mon Dec 12 2016 17:11:34 GMT+0900 (JST)

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/**/*.ts',
      'test/*.ts'
    ],
    exclude: [],

    preprocessors: {
      'test/*_test.ts': ['webpack'],
      'test/**/*_test.ts': ['webpack']
    },

    reporters: ['progress'],
    browsers: ['Chrome', 'Firefox'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts'
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ],

        postLoaders: [
          { test: /_test\.ts$/, loader: 'webpack-espower-loader' }
        ]
      }
    }
  })
}
