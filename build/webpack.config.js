const webpack = require('webpack')

module.exports = {
  node: {
    __dirname: true
  },

  entry: {
    contentScript: './src/contentScript.ts',
    eventPage: './src/eventPage.ts'
  },

  output: {
    path: './dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts'
      }
    ]
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
}
