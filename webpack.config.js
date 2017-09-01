var webpack = require("webpack");
var path = require('path');

module.exports = {
  entry: [
    './src/crayola.js',
    './src/demo.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'game.bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3000
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  }
}
