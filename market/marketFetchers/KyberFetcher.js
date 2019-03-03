const axios = require("axios");
const isEqual = require("lodash/isEqual");

const { getExchanges } = require("../exchanges");
const { setMarketNeedsUpdate } = require("../updateNotifier");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const initialize = async () => {
	await tryUpdateMarket();
	setInterval(async () => {
		await tryUpdateMarket();
	},  5 * 1000);
};

const tryUpdateMarket = async () => {
	try {
		const receivedMarket = (await axios.get("https://api.kyber.network/market")).data.data;
		if (receivedMarket) updateMarket(receivedMarket);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().KYBER.name} API: ${error}`);
	}
};

const updateMarket = (receivedMarket) => {
	const newMarket = [];
	receivedMarket.forEach(pair => {
		if (pair.base_symbol && pair.quote_symbol && pair.last_traded
			&& pair.current_bid && pair.current_ask && pair.eth_24h_volume) {
			newMarket.push({
				b: pair.base_symbol,
				q: pair.quote_symbol,
				m: {
					l: pair.last_traded,
					b: pair.current_bid,
					a: pair.current_ask,
					v: pair.eth_24h_volume
				}
			});
		}
	});
	if (newMarket && !isEqual(newMarket, market)) {
		market = newMarket;
		timestamp = Date.now();
		setMarketNeedsUpdate(true);
	}
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};