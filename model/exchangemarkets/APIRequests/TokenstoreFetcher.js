const _ = require("lodash");
const axios = require("axios");

const { TOKENSTORE } = require("../../exchanges");
const { setModelNeedsBroadcast } = require("../../../websocketbroadcasts/modelNeedsBroadcast");

let market = {};

const initializeTokenstoreFetcher = async () => {
	await updateTokenstoreMarket();
	setInterval(async () => {
		await updateTokenstoreMarket();
	}, 15 * 1000);
};

const updateTokenstoreMarket = async () => {
	try {
		const fetchedMarket = (await axios.get("https://v1-1.api.token.store/ticker")).data;
		market = _.reduce(fetchedMarket, (result, p) => {
			result.push({
				            base_symbol: "ETH", quote_symbol: p.symbol, market_data: {
					exchange: TOKENSTORE,
					last_traded: p.last,
					current_bid: p.ask,
					current_ask: p.bid,
					volume: p.baseVolume,
				}
			            });
			return result;
		}, []);
		setModelNeedsBroadcast(true);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${TOKENSTORE.name} API: ${error}`);
	}
};

const getTokenstoreMarket = () => market;

module.exports = { initializeTokenstoreFetcher, getTokenstoreMarket };