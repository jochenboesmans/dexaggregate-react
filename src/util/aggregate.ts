import reduce from "lodash/reduce";

import { Pair } from "../types/market";

const innerBid: (p: Pair) => number =
		p => reduce(p.marketData, (max, emd) => emd.currentBid > max ?  emd.currentBid : max, 0);
const innerAsk: (p: Pair) => number =
		p => reduce(p.marketData, (min, emd) => emd.currentAsk < min ? emd.currentAsk : min, Number.MAX_VALUE);

export { innerAsk, innerBid };