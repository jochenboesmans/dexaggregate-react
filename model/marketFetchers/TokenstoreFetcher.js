const _ = require("lodash");
const axios = require("axios");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;

const initialize = () => {
	updateTokenstoreMarket();
	setInterval(() => {
		updateTokenstoreMarket();
	}, 15 * 1000);
};

const updateTokenstoreMarket = async () => {
	try {
		const fetchedMarket = (await axios.get("https://v1-1.api.token.store/ticker")).data;
		market = _.reduce(fetchedMarket, (result, p) => {
			result.push({
				            b: "ETH", q: p.symbol, m: {
					l: p.last,
					b: p.ask,
					a: p.bid,
					v: p.baseVolume,
				}
			            });
			return result;
		}, []);
		setModelNeedsBroadcast(true);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().TOKENSTORE.name} API: ${error}`);
	}
};

const getMarket = () => market;

module.exports = { initialize, getMarket };