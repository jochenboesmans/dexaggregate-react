const _ = require("lodash");

const fetchExchangeMarkets = require("./APIRequests/fetchExchangeMarkets");
const { updateExchangeMarket } = require("./exchangeMarkets");

const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

/**
 * Updates model of exchangeMarkets based on newly, successfully fetched exchangeMarkets.
 */
module.exports = async (web3) => {
	const fetchedExchangeMarkets = await fetchExchangeMarkets(web3);

	_.forEach(fetchedExchangeMarkets, em => {
		if(em.market) {
			updateExchangeMarket(em.exchange, { ...em, timestamp: Date.now() });
		}
	});
	console.log("Market model updated.");
	setModelNeedsBroadcast(true);
};
