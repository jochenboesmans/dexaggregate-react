"use strict";

var express = require("express");

var path = require("path");

var _require = require("../market/market"),
    getMarket = _require.getMarket,
    getExchangeMarkets = _require.getExchangeMarkets;

var _require2 = require("../market/exchanges"),
    getExchanges = _require2.getExchanges;

module.exports = function (app) {
  app.get("/api/exchanges", function (req, res) {
    res.send(getMarket().exchanges);
  });
  app.get("/api/market/:exchange", function (req, res) {
    var exchangeInModel = getExchanges()[req.params.exchange.toUpperCase()];
    res.send(exchangeInModel ? getExchangeMarkets()[exchangeInModel.ID] : null);
  });
  app.get("/api/market", function (req, res) {
    res.send(getMarket());
  });

  if ((process && process.env && process.env.NODE_ENV || "development") === "production") {
    app.use(express.static("client/build"));
    app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
};