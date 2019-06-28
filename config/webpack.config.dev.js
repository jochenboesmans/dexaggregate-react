"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const { BundleAnalyzerPlugin: webpackBundleAnalyzer } = require("webpack-bundle-analyzer");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	/* Source map for development. */
	//devtool: "inline-source-map",
	context: path.resolve(__dirname, "../src"),
	entry: [
		"core-js/modules/es6.promise",
		"core-js/modules/es6.array.iterator",
		path.resolve(__dirname, "../src/index.ts"),
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
		new webpack.HotModuleReplacementPlugin(),
		//new webpackBundleAnalyzer(),
	],
	devServer: {
		hot: true,
	},
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
				test: /\.[tjm]sx?$/,
				enforce: "pre",
				include: path.resolve(__dirname, "../src"),
				use: [{
					loader: require.resolve("eslint-loader"),
					options: {
						fix: true,
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
						test: [/\.[tjm]sx?$/],
						include: path.resolve(__dirname, "../src"),
						loader: require.resolve("babel-loader"),
					},
					{
						exclude: /\.([tjm]sx?)|(html)|(json)$/,
						loader: require.resolve("file-loader"),
						options: {
							name: "static/media/[name].[hash:8].[ext]",
						},
					},
				],
			},
		],
	},
};