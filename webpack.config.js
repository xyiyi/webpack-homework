const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractCSS = new ExtractTextPlugin('[name].[contenthash].css')
let cssLoader = extractCSS.extract(['css-loader'])
let lessLoader = extractCSS.extract(['css-loader', 'less-loader'])

const env = process.env.NODE_ENV;



module.exports = {
	entry:{
		main:'./app/index.js',
		vendor:['jquery']
	},
	output:{
		filename:'[name].[chunkhash:5].js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[{
			test:/\.css$/,
			loader:ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'}),
			include:path.resolve(__dirname,'app')
		},
		{
            test: /\.less$/,
           // loader: ['style-loader', 'css-loader', 'less-loader']
			loader:lessLoader,
			include:path.resolve(__dirname,'app')
        }
		]
	},
	plugins:[
		new HTMLPlugin({
			title:'webpack',
			template:'src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names:['vendor','manifest']
		}),
		new ExtractTextPlugin({
			filename:'style.[hash].css',
			allChunks:true
		}),
		new webpack.DefinePlugin({
			 'process.env.NODE_ENV': JSON.stringify(env)
		}),
		extractCSS
	]
}