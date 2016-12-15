// Karma configuration
// Generated on Mon Dec 12 2016 17:11:34 GMT+0900 (JST)

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'fixture'],
    files: [
      'test/fixtures/**/*.html',
      'test/index.js'
    ],
    exclude: [],

    preprocessors: {
      'test/fixtures/**/*.html': ['html2js'],
      'test/index.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: ['progress'],
    browsers: ['Chrome'],

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
          { test: /\.spec\.ts$/, loader: 'webpack-espower-loader' }
        ]
      },

      resolve: {
        extensions: ['', '.ts', '.js']
      }
    }
  })
}
