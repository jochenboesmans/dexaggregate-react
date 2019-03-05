"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
//const { BundleAnalyzerPlugin: webpackBundleAnalyzer } = require("webpack-bundle-analyzer");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	/* Source map for development. */
	// devtool: "inline-source-map",
	context: path.resolve(__dirname, "../../client"),
	entry: [
		"core-js/modules/es6.promise",
		"core-js/modules/es6.array.iterator",
		path.resolve(__dirname, "../src/index.js"),
	],
	output: {
		path: path.resolve(__dirname, "../build"),
		publicPath: "/",
		filename: "static/js/[name].bundle.js",
		chunkFilename: "static/js/[name].bundle.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	plugins: [
		new CleanWebpackPlugin(["build/*.*"]),
		new HtmlWebpackPlugin({
			inject: true,
			template: "./public/index.html",
		}),
		//new webpack.HotModuleReplacementPlugin(),
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
			/*// (2) TS Loader
			{
				test: /\.tsx?$/,
				enforce: "pre",
				include: path.resolve(__dirname, "../src"),
				use: [{
					loader: require.resolve("awesome-typescript-loader"),
					options: {
					},
				},],
			},*/
			// (3) URL Loader | Babel Loader | File Loader
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
						include: path.resolve(__dirname, "../src/"),
						loader: require.resolve("babel-loader"),
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-react",
								"@babel/preset-typescript",
							],
							plugins: [
								"@babel/plugin-syntax-dynamic-import",
								"@babel/plugin-transform-async-to-generator",
								"@babel/plugin-transform-runtime",
							],
						},
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
	},
};