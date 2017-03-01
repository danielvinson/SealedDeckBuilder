var webpack = require('webpack');

module.exports = {
  entry: {
    app: './frontend/app.js',
  },
  output: {
    path: __dirname + '/backend/static/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
};
