"use strict";

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const webpackConfig = require("../config/webpack.config.d.js");
const compiler = Webpack(webpackConfig);

const server = new WebpackDevServer(compiler, { hot: true });

server.listen(3000, "127.0.0.1", () => {
	console.log("Webpack Dev Server at http://localhost:3000");
});
