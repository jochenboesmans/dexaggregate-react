import reduce from "lodash/reduce";
import maxBy from "lodash/maxBy";
import orderBy from "lodash/orderBy";

import {Currency, Pair} from "../types/market";

/* Aggregation functions reducing exchange market data to general market data. */

const innerBid: (p: Pair) => number =
	p => reduce(p.marketData, (max, emd) => emd.currentBid > max ?  emd.currentBid : max, 0);
const innerAsk: (p: Pair) => number =
	p => reduce(p.marketData, (min, emd) => emd.currentAsk < min ? emd.currentAsk : min, Number.MAX_VALUE);
const baseVolume: (p: Pair) => number =
	p => reduce(p.marketData, (sum, emd) => sum + emd.baseVolume, 0);
const lastPrice: (p: Pair) => number =
	p => (maxBy(p.marketData, emd => emd.timestamp)).lastPrice;
const lastTimestamp: (p: Pair) => number =
	p => (maxBy(p.marketData, emd => emd.timestamp)).timestamp;

/* Retrieve a list of currencies with aggregated market data from pairs. */
const currenciesFromPairs: (m: Array<Pair>) => Array<Currency> =
	m => {
		const aggregateAsObject = reduce(m, (acc, p) => {
			const c = acc[p.quoteSymbol];
			const ib = innerBid(p);
			const ia = innerAsk(p);
			const bv = baseVolume(p);
			const lp = lastPrice(p);
			const ts = lastTimestamp(p);
			if (!c) {
				acc[p.quoteSymbol] = {
					lastPrice: lp,
					currentAsk: ia,
					currentBid: ib,
					baseVolume: bv,
					timestamp: ts,
				};
				return acc;
			} else {
				acc[p.quoteSymbol].baseVolume += bv;
				acc[p.quoteSymbol].ib = Math.max(ib, c.currentBid);
				acc[p.quoteSymbol].ia = Math.min(ia, c.currentAsk);
				acc[p.quoteSymbol].lp = (maxBy([c, p.marketData], s => s.timestamp)).lastPrice;
				acc[p.quoteSymbol].timestamp = (maxBy([c, p.marketData], s => s.timestamp)).timestamp;
				return acc;
			}
		}, {});
		const asArray = reduce(Object.entries(aggregateAsObject), (acc, [k, v]) => {
			acc.push({
				...v,
				quoteSymbol: k
			});
			return acc;
		}, []);
		return orderBy(asArray, [entry => entry.baseVolume], ["desc"]);
	};

export {
	innerAsk,
	innerBid,
	baseVolume,
	lastPrice,
	lastTimestamp,
	currenciesFromPairs
};