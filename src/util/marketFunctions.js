import reduce from "lodash/reduce";

const lowestCurrentAskAcrossExchanges = (market, p) => {
	return reduce(p.m, (min, emd) => emd.a < min ? emd.a : min, Number.MAX_VALUE);
};

const highestCurrentBidAcrossExchanges = (market, p) => {
	return reduce(p.m, (max, emd) => emd.b > max ? emd.b : max, 0);
};

export {
	lowestCurrentAskAcrossExchanges, highestCurrentBidAcrossExchanges,
};

