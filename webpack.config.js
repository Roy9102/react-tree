/* 
* @Author:             Roy
* @Date:               2015-12-30 16:51:16
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   Roy
* @Last Modified time: 2016-02-24 11:39:18
*/

'use strict';

var webpack            = require('webpack');
var path               = require('path');
var fs                 = require('fs');
var UglifyJsPlugin     = webpack.optimize.UglifyJsPlugin; 
var nodeModulesPath    = path.resolve(process.cwd(), 'node_modules');
var Library            = 'react-tree';

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
			tree:  "./components/tree.jsx",
			// common: chunks
		},
		externals: {
			"react": {
				root: "react",
                commonjs2: "react",
                commonjs: ["./node_modules", "react"],
                amd: "react"
			},
			"react-addons-css-transition-group": {
				root: "react-addons-css-transition-group",
                commonjs2: "react-addons-css-transition-group",
                commonjs: ["./node_modules", "react-addons-css-transition-group"],
                amd: "react-addons-css-transition-group"
			}
		},
		output:{
			path: path.resolve( isDebug ? 'build' : 'public' ),
			filename : isDebug ? '[name].js' : 'js/[hash:8].[name].min.js',
            publicPath:     isDebug ? '/build/' : '',
            library:        Library,
            libraryTarget:  'umd',
            umdNamedDefine: true
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
					loader: 'css?minimize!sass'
				}
			]

        },
        plugins:[]
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
