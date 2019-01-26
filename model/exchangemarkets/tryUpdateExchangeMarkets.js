const _ = require("lodash");

const fetchExchangeMarkets = require("./APIRequests/fetchExchangeMarkets");
const exchangeMarkets = require("./exchangeMarkets");

const {setModelNeedsBroadcast} = require("../../websocketbroadcasts/modelNeedsBroadcast");

/**
 * Updates model of exchangeMarkets based on newly, successfully fetched exchangeMarkets.
 */
module.exports = async () => {
	const fetchedExchangeMarkets = await fetchExchangeMarkets();

	_.forEach(fetchedExchangeMarkets, em => {
		if (em.market) {
			const exchangeID = em.exchange.ID;
			exchangeMarkets[exchangeID] = {...em, timestamp: Date.now()};
		}
	});
	console.log("Market model updated.");
	setModelNeedsBroadcast(true);
};
