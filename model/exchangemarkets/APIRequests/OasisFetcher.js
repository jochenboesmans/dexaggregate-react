const _ = require("lodash");
const axios = require("axios");

const { OASIS } = require("../../exchanges");
const { setModelNeedsBroadcast } = require("../../../websocketbroadcasts/modelNeedsBroadcast");

let market = {};

const initializeOasisFetcher = async () => {
	await updateOasisMarket();
	setInterval(async () => {
		await updateOasisMarket();
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
					            base_symbol: pair.quote, quote_symbol: pair.base, market_data: {
						exchange: OASIS,
						last_traded: parseFloat(m.last),
						current_bid: parseFloat(m.bid),
						current_ask: parseFloat(m.ask),
						volume: parseFloat(m.vol) * twentyFourHourAverage(m),
					}
				});
			}
		})));
		setModelNeedsBroadcast(true);
	} catch(error) {
		console.log(`Error while trying to fetch pairs from ${OASIS.name} API: ${error.message}`);
	}
};

const getOasisMarket = () => market;

module.exports = { initializeOasisFetcher, getOasisMarket };