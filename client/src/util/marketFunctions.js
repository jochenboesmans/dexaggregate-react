import _ from "lodash";

const findPair = (market, baseSymbol, quoteSymbol) => {
	return _.find(market, p => p.quote_symbol === quoteSymbol && p.base_symbol === baseSymbol);
};

const lowestCurrentAskEMDAcrossExchanges = (market, baseSymbol, quoteSymbol) => {
	const p = findPair(market, baseSymbol, quoteSymbol);
	return _.minBy(p.market_data, emd => emd.current_ask);
};

const highestCurrentBidEMDAcrossExchanges = (market, baseSymbol, quoteSymbol) => {
	const p = findPair(market, baseSymbol, quoteSymbol);
	return _.maxBy(p.market_data, emd => emd.current_bid);
};

export {
	findPair,
	lowestCurrentAskEMDAcrossExchanges,
	highestCurrentBidEMDAcrossExchanges,
};

