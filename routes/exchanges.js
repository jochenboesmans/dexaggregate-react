const getMarket = require("../model/getMarket");

module.exports = (app) => {
	app.get("/api/exchanges", (req, res) => { res.send(getMarket().exchanges); });
};