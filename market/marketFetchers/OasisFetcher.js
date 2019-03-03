const axios = require("axios");
const isEqual = require("lodash/isEqual");

const { getExchanges } = require("../exchanges");
const { setMarketNeedsUpdate } = require("../updateNotifier");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const pairs = [{
	base: "MKR",
	quote: "ETH"
}, {
	base: "ETH",
	quote: "DAI"
}, {
	base: "MKR",
	quote: "DAI"
},];

const initialize = async () => {
	await tryUpdateMarket();
	setInterval(async () => {
		await tryUpdateMarket();
	}, 15 * 1000);
};

const tryUpdateMarket = async () => {
	try {
		const newMarket = await Promise.all(pairs.map(async (pair) => {
			const m = (await axios.get(`http://api.oasisdex.com/v1/markets/${pair.base}/${pair.quote}`)).data.data;
			return filterMeaningfulValues(m, pair);
		}));
		if (newMarket && !isEqual(newMarket, market)) {
			market = newMarket;
			timestamp = Date.now();
			setMarketNeedsUpdate(true);
		}
	} catch(error) {
		console.log(`Error while trying to fetch pairs from ${getExchanges().OASIS.name} API: ${error.message}`);
	}
};

const filterMeaningfulValues = (m, pair) => {
	if (m && parseFloat(m.price) && parseFloat(m.bid) && parseFloat(m.ask) && parseFloat(m.vol)) {
		return ({
			b: pair.quote,
			q: pair.base,
			m: {
				l: parseFloat(m.last),
				b: parseFloat(m.bid),
				a: parseFloat(m.ask),
				v: parseFloat(m.vol) * parseFloat(m.price),
			}
		});
	}
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};