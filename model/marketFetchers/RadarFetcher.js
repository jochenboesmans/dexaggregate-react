const _ = require("lodash");
const axios = require("axios");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;

const initialize = async () => {
	await updateRadarMarket();
	setInterval(async () => {
		await updateRadarMarket();
	}, 15 * 1000);
};

const updateRadarMarket = async () => {
	try {
		const retrievedMarket = (await axios.get("https://api.radarrelay.com/v2/markets?include=base,ticker,stats,history")).data;
		market = _.reduce(retrievedMarket, (result, pair) => {
			if(pair.active && pair.displayName.split("/")[1] && pair.displayName.split("/")[0] && parseFloat(pair.ticker.price)
			&& parseFloat(pair.ticker.bestBid) && parseFloat(pair.ticker.bestAsk) && parseFloat(pair.stats.volume24Hour)) {
				result.push({
					            base_symbol: pair.displayName.split("/")[1], quote_symbol: pair.displayName.split("/")[0], market_data: {
						exchange: getExchanges().RADAR,
						last_traded: parseFloat(pair.ticker.price),
						current_bid: parseFloat(pair.ticker.bestBid),
						current_ask: parseFloat(pair.ticker.bestAsk),
						volume: parseFloat(pair.stats.volume24Hour),
					}
				            });
			}
			return result;
		}, []);
		setModelNeedsBroadcast(true);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().RADAR.name} API: ${error}`);
	}
};

const getMarket = () => market;

module.exports = { initialize, getMarket };