/* 
* @Author:             Roy
* @Date:               2015-12-30 16:51:16
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   Roy
* @Last Modified time: 2016-02-24 11:22:33
*/

'use strict';

var webpack            = require('webpack');
var path               = require('path');
var fs                 = require('fs');
var extractLinkCSS     = require('extract-text-webpack-plugin');
var commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin     = webpack.optimize.UglifyJsPlugin; 
var nodeModulesPath    = path.resolve(process.cwd(), 'node_modules');


var webpackConfig = function (options) {

	options     = options || {};
	var isDebug = process.env.WEBPACK_DEV;
	var cssName = isDebug ? 'css/[name].min.css' : 'css/[contenthash:8].[name].min.css';
	var chunks  = ["react", "react-dom"];
	var config  = {
		devtool: isDebug ? 'source-map' : 'eval',
		addVendors:function(alias_name, mPath){
			this.resolve.alias[alias_name] = mPath;
			this.module.noParse.push(new RegExp(mPath));
		},
		entry:  {
			demo:  "./demo/index.js",
			// common: chunks
		},
		output:{
			path:'./demo',
			filename : isDebug ? '[name].js' : 'js/[hash:8].[name].min.js',
            publicPath:  '/demo/'
		},
		resolve: {
            root: [nodeModulesPath],
            alias: {}
        },
        module:{
        	noParse: [],
        	loaders:[
        		{
					test:/\.jsx?$/,
					loader:'babel-loader',
					exclude: [nodeModulesPath]
				},
				{
					test:/\.json?$/,
					loader:'json-loader',
					exclude: [nodeModulesPath]
				},
				{
					test:/\.(png|jpg|gif|svg|webp|ico)$/,
					loader:'url-loader?limit=8192&name=img/[hash:8].[name].[ext]',
				},
				{
					test:/\.(eot|ttf|woff)$/,
					loader:'file?limit=1240&name=fonts/[hash:8].[name].[ext]',
				},
				{
					test:   /\.css$/,
					loader: 'style!css?minimize'
				},
				{
					test:   /\.less$/,
					loader: 'css?minimize!less'
				},
				{
					test:   /\.scss$/,
					loader: extractLinkCSS.extract('style','css?minimize!sass')	
				}
			]

        },
        plugins:[
			// new commonsChunkPlugin({
			// 	name:'common',
			// 	filename:"common.js",
			// 	minChunks:Infinity  //提取所有chunks共同依赖的模块
			// }),
			new extractLinkCSS(cssName,{
				// 当allChunks指定为false时，css loader必须指定怎么处理
	            // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
	            // 第一个参数`notExtractLoader`，一般是使用style-loader
	            // @see https://github.com/webpack/extract-text-webpack-plugin
				allChunks: false
			})
		]
	};
	
	if (!isDebug){
		config.plugins.push(new UglifyJsPlugin({
			mangle: {
		        except: ['exports', 'require']
		    }
		}));
	}
	return config;

}


module.exports = webpackConfig();
