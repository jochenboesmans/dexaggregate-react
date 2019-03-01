"use strict";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const Webpack = require("webpack");

const webpackConfig = require("../config/webpack.config.p.js");
const compiler = Webpack(webpackConfig);

compiler.run

server.listen(3000, "127.0.0.1", () => {
	console.log("Webpack Dev Server at http://localhost:3000");
});