const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        p_display: path.resolve('./dev/p_display.jsx')
    },
    output: {
        path: path.resolve('./public/index/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
     ]
};