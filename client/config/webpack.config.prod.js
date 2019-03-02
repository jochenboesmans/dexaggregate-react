"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin: webpackBundleAnalyzer } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	/* Source map with quick build speed for production. */
	//devtool: "source-map",
	context: path.resolve(__dirname, "../../client"),
	entry: [
		"core-js/modules/es6.promise",
		"core-js/modules/es6.array.iterator",
		path.resolve(__dirname, "../src/index.js"),
	],
	output: {
		path: path.resolve(__dirname, "../build"),
		publicPath: "/",
		filename: "static/js/[name].[hash].js",
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
		new webpackBundleAnalyzer(),
	],

	optimization: {
		minimizer: [new TerserPlugin({
			terserOptions: {
				parse: {
					// we want terser to parse ecma 8 code. However, we don't want it
					// to apply any minfication steps that turns valid ecma 5 code
					// into invalid ecma 5 code. This is why the 'compress' and 'output'
					// sections only apply transformations that are ecma 5 safe
					// https://github.com/facebook/create-react-app/pull/4234
					ecma: 8,
				},
				compress: {
					ecma: 5,
					warnings: false, // Disabled because of an issue with Uglify breaking seemingly
					// valid code:
					// https://github.com/facebook/create-react-app/issues/2376
					// Pending further investigation:
					// https://github.com/mishoo/UglifyJS2/issues/2011
					comparisons: false, // Disabled because of an issue with Terser breaking valid
					// code:
					// https://github.com/facebook/create-react-app/issues/5250
					// Pending futher investigation:
					// https://github.com/terser-js/terser/issues/120
					inline: 2,
				},
				mangle: {
					safari10: true,
				},
				output: {
					ecma: 5,
					comments: false, // Turned on because emoji and regex is not minified properly
					// using default
					// https://github.com/facebook/create-react-app/issues/2488
					ascii_only: true,
				},
			}, // Use multi-process parallel running to improve the build speed
			// Default number of concurrent runs: os.cpus().length - 1
			parallel: true, // Enable file caching
			cache: true,
		})],
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
									"@babel/preset-react"
								],
								plugins: [
									"@babel/plugin-syntax-dynamic-import",
									"@babel/plugin-transform-async-to-generator",
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