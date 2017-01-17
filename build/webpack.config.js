const webpack = require('webpack')

module.exports = {
  node: {
    __dirname: true
  },

  entry: {
    contentScript: './src/contentScript.ts',
    background: './src/background.ts',
    popup: './src/popup.ts'
  },

  output: {
    path: './dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts'
      }
    ]
  },

  resolve: {
    extensions: ['', '.ts', '.js'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ]
}
