"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const { BundleAnalyzerPlugin: webpackBundleAnalyzer } = require("webpack-bundle-analyzer");

module.exports = {
	mode: "production",
	/* Source map with quick build speed for production. */
	//devtool: "source-map",
	context: path.resolve(__dirname, "../src"),
	entry: [
		"core-js/modules/es6.promise",
		"core-js/modules/es6.array.iterator",
		path.resolve(__dirname, "../src"),
	],
	output: {
		path: path.resolve(__dirname, "../build"),
		publicPath: "/",
		filename: "static/js/[name].js",
		chunkFilename: "static/js/[name].bundle.js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, "../public/index.html"),
		}),
		//new webpackBundleAnalyzer(),
	],
	optimization: {
		splitChunks: {
			chunks: "all",
			maxInitialRequests: 10,
		},
		runtimeChunk: true,
		usedExports: true,
	},
	module: {
		rules: [
			// (1) ESLint
			{
				test: /\.[jtm]sx?$/,
				enforce: "pre",
				include: path.resolve(__dirname, "../src"),
				use: [{
					loader: require.resolve("eslint-loader"),
					options: {
						eslintPath: require.resolve("eslint"),
					},
				},],
			},
			// (2) URL Loader | Babel Loader | File Loader
			{
				oneOf: [
					{
						test: /\.(bmp|gif|jpe?g|png)$/,
						loader: require.resolve("url-loader"),
						options: {
							limit: 10000,
							name: "static/media/[name].[hash:8].[ext]",
						},
					},
					{
						test: [/\.[jtm]sx?$/],
						include: path.resolve(__dirname, "../src"),
						loader: require.resolve("babel-loader"),
					},
					{
						exclude: /\.([jtm]sx?)|(html)|(json)$/,
						loader: require.resolve("file-loader"),
						options: {
							name: "static/media/[name].[hash:8].[ext]",
						},
					},
				],
			},
		],
	}
};