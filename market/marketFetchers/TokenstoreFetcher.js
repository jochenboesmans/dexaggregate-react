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
	}, 5 * 1000);
};

const tryUpdateMarket = async () => {
	try {
		const fetchedMarket = (await axios.get("https://v1-1.api.token.store/ticker")).data;

		const newMarket = [];
		Object.keys(fetchedMarket).forEach(pKey => {
			const p = fetchedMarket[pKey];
			if (p.symbol && p.last && p.ask && p.bid && p.baseVolume) {
				newMarket.push({
					b: "ETH",
					q: p.symbol,
					m: {
						l: p.last,
						b: p.ask,
						a: p.bid,
						v: p.baseVolume,
					}
				});
			}
		});
		if (newMarket && !isEqual(newMarket, market)) {
			market = newMarket;
			timestamp = Date.now();
			setMarketNeedsUpdate(true);
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