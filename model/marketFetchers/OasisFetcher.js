const _ = require("lodash");
const axios = require("axios");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;

const initialize = async () => {
	updateOasisMarket();
	setInterval(async () => {
		updateOasisMarket();
	}, 30 * 1000);
};

const updateOasisMarket = async () => {
	const pairs = [{ base: "MKR", quote: "ETH" },
		{ base: "ETH", quote: "DAI" },
		{ base: "MKR", quote: "DAI" },];
	const twentyFourHourAverage = (m) => (parseFloat(m.high) + parseFloat(m.low)) / 2;

	try {
		market = (await Promise.all(_.map(pairs, async (pair) => {
			const m = (await axios.get(`http://api.oasisdex.com/v1/markets/${pair.base}/${pair.quote}`)).data.data;
			if(m && parseFloat(m.price) && parseFloat(m.bid) && parseFloat(m.ask) && parseFloat(m.vol)) {
				return({
					            b: pair.quote, q: pair.base, m: {
						l: parseFloat(m.last),
						b: parseFloat(m.bid),
						a: parseFloat(m.ask),
						v: parseFloat(m.vol) * twentyFourHourAverage(m),
					}
				});
			}
		})));
		setModelNeedsBroadcast(true);
	} catch(error) {
		console.log(`Error while trying to fetch pairs from ${getExchanges().OASIS.name} API: ${error.message}`);
	}
};

const getMarket = () => market;

module.exports = { initialize, getMarket };