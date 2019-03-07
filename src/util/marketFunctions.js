import reduce from "lodash/reduce";

const findPair = (market, baseSymbol, quoteSymbol) => {
	return market.find(p => p.q === quoteSymbol && p.b === baseSymbol);
};

const lowestCurrentAskAcrossExchanges = (market, baseSymbol, quoteSymbol) => {
	const p = findPair(market, baseSymbol, quoteSymbol);
	return reduce(p.m, (min, emd) => emd.a < min ? emd.a : min, Number.MAX_VALUE);
};

const highestCurrentBidAcrossExchanges = (market, baseSymbol, quoteSymbol) => {
	const p = findPair(market, baseSymbol, quoteSymbol);
	return reduce(p.m, (max, emd) => emd.b > max ? emd.b : max, 0);
};

export {
	findPair, lowestCurrentAskAcrossExchanges, highestCurrentBidAcrossExchanges,
};

