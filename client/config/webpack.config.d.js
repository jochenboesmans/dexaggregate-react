"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	/* Source map for development. */
	devtool: "inline-source-map",
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
		chunkFilename: "static/js/[name].bundle.js"

	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	plugins: [
		new CleanWebpackPlugin(["build"]),
		new HtmlWebpackPlugin({
			inject: true,
			template: "./public/index.html",
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		hot: true,
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
		runtimeChunk: true,
		usedExports: true,
	},
	module: {
		rules: [
			// First, run the linter.
			// It's important to do this before Babel processes the JS.
			{
				test: /\.(js|mjs|jsx)$/,
				enforce: "pre",
				exclude: /node_modules/,
				use: [{
					options: {
						formatter: require.resolve("react-dev-utils/eslintFormatter"),
						eslintPath: require.resolve("eslint"),
					},
					loader: require.resolve("eslint-loader"),
				},],
			}, {
				// "oneOf" will traverse all following loaders until one will
				// match the requirements. When no loader matches it will fall
				// back to the "file" loader at the end of the loader list.
				oneOf: [// Process application JS with Babel.
					{
						test: /\.(js|mjs|jsx|ts|tsx)$/,
						exclude: /node_modules/,
						use: [{
							options: {
								presets: [
									"@babel/preset-env",
									"@babel/preset-react",
								],
								plugins: [
									"@babel/plugin-syntax-dynamic-import",
								],
							},
							loader: require.resolve("babel-loader"),
						}],
					}, // "file" loader makes sure those assets get served by WebpackDevServer.
					// When you `import` an asset, you get its (virtual) filename.
					// In production, they would get copied to the `build` folder.
					// This loader doesn't use a "test" so it will catch all modules
					// that fall through the other loaders.
					{
						// Exclude `js` files to keep "css" loader working as it injects
						// its runtime that would otherwise be processed through "file" loader.
						// Also exclude `html` and `json` extensions so they get processed
						// by webpacks internal loaders.
						exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
						loader: require.resolve("file-loader"),
						options: {
							name: "static/media/[name].[hash:8].[ext]",
						},
					},],
			}, // ** STOP ** Are you adding a new loader?
			// Make sure to add the new loader(s) before the "file" loader.
		],
	}
};