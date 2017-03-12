const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        login: path.resolve('./dev/login.jsx'),
        // index: path.resolve('./dev/index.jsx'),
        // NewsList: path.resolve('./dev/admin_newslist.jsx'),
        // NewsContent: path.resolve('./dev/admin_newsContent.jsx'),
        product:path.resolve('./dev/admin_product.jsx'),
        news:path.resolve('./dev/admin_news.jsx')
        // admin_Lproductlist:path.resolve('./dev/admin_Lproductlist.jsx')
        // admin_health:path.resolve('./dev/admin_health.jsx'),
        // ProductCon: path.resolve('./dev/admin_productCon.jsx')
    },
    output: {
        path: path.resolve('./public/admin/js'),
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
}
;