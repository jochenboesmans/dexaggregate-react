const _ = require("lodash");
const axios = require("axios");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const initialize = async () => {
	await tryUpdateMarket();
	setInterval(async () => {
		await tryUpdateMarket();
	}, 5 * 1000);
};

const tryUpdateMarket = async () => {
	try {
		const fetchedMarket = (await axios.get("https://v1-1.api.token.store/ticker")).data;
		const newMarket = _.reduce(fetchedMarket, (result, p) => {
			result.push({
				b: "ETH",
				q: p.symbol,
				m: {
					l: p.last,
					b: p.ask,
					a: p.bid,
					v: p.baseVolume,
				}
			});
			return result;
		}, []);
		if (newMarket && !_.isEqual(newMarket, market)) {
			market = newMarket;
			timestamp = Date.now();
			setModelNeedsBroadcast(true);
			console.log("tokenstore update");
		}
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().TOKENSTORE.name} API: ${error}`);
	}
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};