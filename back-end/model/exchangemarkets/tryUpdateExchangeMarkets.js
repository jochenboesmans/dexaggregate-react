const _ = require("lodash");

const fetchExchangeMarkets = require("./APIRequests/fetchExchangeMarkets");
const exchangeMarkets = require("./exchangeMarkets");

const setModelUpdated = require("../../websocketbroadcasts/modelUpdated").setModelUpdated;

/**
 * Updates model of exchangeMarkets based on newly, successfully fetched exchangeMarkets.
 */
module.exports = async () => {
	const fetchedExchangeMarkets = await fetchExchangeMarkets();
	_.forEach(fetchedExchangeMarkets, em => {
		if (em.market) {
			const exchangeID = em.exchange.ID;
			exchangeMarkets[exchangeID] = em;
		}
	});
	setModelUpdated(true);
};
