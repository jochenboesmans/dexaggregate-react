const express = require("express");
const path = require("path");

const { getMarket, getExchangeMarkets } = require("../market/market");
const { getExchanges } = require("../market/exchanges");

module.exports = (app) => {

	app.get("/api/exchanges", (req, res) => {
		res.send(getMarket().exchanges);
	});

	app.get("/api/market/:exchange", (req, res) => {
		const exchangeInModel = getExchanges()[(req.params.exchange).toUpperCase()];
		res.send(exchangeInModel ? getExchangeMarkets()[exchangeInModel.ID] : null);
	});

	app.get("/api/market", (req, res) => {
		res.send(getMarket());
	});

	if(process.env.NODE_ENV === "production") {
		app.use(express.static("client/build"));

		app.get("*", (req, res) => {
			res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
		});
	}
};