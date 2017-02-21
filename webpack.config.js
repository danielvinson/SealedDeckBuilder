var webpack = require('webpack');  

module.exports = {  
  entry: [
    "./frontend/app.js"
  ],
  output: {
    path: __dirname + '/backend/static',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
  ]
};
