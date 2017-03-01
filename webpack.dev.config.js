var webpack = require('webpack');
var path = require('path');

var config = module.exports = require('./webpack.config.js');

config.debug = true;
config.devtool = 'inline-source-map';
