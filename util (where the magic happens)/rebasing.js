const _ = require("lodash/core");

const rebaseMarket = (market, marketRebaseSymbol) => {

	/* One level rebase. */
	const simpleRateMemo = {};
	const simpleRebaseRate = (rebaseSymbol, baseSymbol, rate) => {
		if (baseSymbol === rebaseSymbol) {
			return rate;
		} else if (simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate]) {
			return simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate];
		} else {
			const rebasePair = market[rebaseSymbol + "/" + baseSymbol];
			const rebasedRate = rebasePair ? rate * volumeWeightedSpreadAverage(rebaseSymbol, baseSymbol) : 0;
			simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate] = rebasedRate;
			return rebasedRate;
		}
	};

	/* Calculate sum of volume across different exchanges. */
	const emdVolumeMemo = {};
	const getEMDVolume = (pair) => {
		if (emdVolumeMemo[pair.b + "/" + pair.q]) return emdVolumeMemo[pair.b + "/" + pair.q];
		const emdVolume = _.reduce(pair.m, (sum, emd) => sum + emd.v, 0);
		emdVolumeMemo[pair.b + "/" + pair.q] = emdVolume;
		return emdVolume;
	};

	/* Deep rebase. */
	const rateMemo = {};
	const rebaseRate = (rebaseSymbol, baseSymbol, quoteSymbol, rate) => {
		if (baseSymbol === rebaseSymbol) {
			return rate;
		} else if (rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate]) {
			return rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate];
		} else {
			const originalPair = market[baseSymbol + "/" + quoteSymbol];
			const immediateRebasePair = market[rebaseSymbol + "/" + baseSymbol];

			/* Find level 2 rebases consisting of 2 pairs that form a path from baseSymbol to rebaseSymbol. */
			let possibleL2Rebases = [];
			Object.keys(market).forEach((p2Key) => {
				const p2 = market[p2Key];
				if (p2.b === rebaseSymbol) {
					let matchingP1 = null;
					Object.keys(market).forEach((p1Key) => {
						const p1 = market[p1Key];
						if(baseSymbol === p1.q && p1.b === p2.q) matchingP1 = p1;
					});
					if (matchingP1) possibleL2Rebases.push({ p1: matchingP1, p2: p2 });
				}
			});

			/* Calculate a volume-weighted average rate based on all possible rebases. */
			const sums = { volumeWeightedSum: 0, combinedVolume: 0 };
			possibleL2Rebases.forEach(pr => {
				const phase1Volume = getEMDVolume(originalPair);
				const rebasedPhase1Volume = simpleRebaseRate(pr.p1.b, baseSymbol, phase1Volume);
				const phase2Volume = getEMDVolume(pr.p1);
				const rebasedPhase2Volume = simpleRebaseRate(pr.p2.b, pr.p1.b, phase2Volume);
				const phase3Volume = getEMDVolume(pr.p2);
				// this doesn't really need to be rebased as it's based in the rebaseSymbol
				const rebasedPhase3Volume = simpleRebaseRate(rebaseSymbol, pr.p2.b, phase3Volume);

				const rebasedPathVolume = rebasedPhase1Volume + rebasedPhase2Volume + rebasedPhase3Volume;

				const rebasedPhase1Rate = simpleRebaseRate(pr.p1.b, baseSymbol, rate);
				const rebasedPhase2Rate = simpleRebaseRate(pr.p2.b, pr.p1.b, rebasedPhase1Rate);
				
				sums.volumeWeightedSum += rebasedPathVolume * rebasedPhase2Rate;
				sums.combinedVolume += rebasedPathVolume;
			});

			if (immediateRebasePair) {
				const phase1Volume = getEMDVolume(originalPair);
				const rebasedPhase1Volume = simpleRebaseRate(immediateRebasePair.b, originalPair.b, phase1Volume);
				const phase2Volume = getEMDVolume(immediateRebasePair);
				// this doesn't really need to be rebased as it's based in the rebaseSymbol
				const rebasedPhase2Volume = simpleRebaseRate(rebaseSymbol, immediateRebasePair.b, phase2Volume);

				const rebasedPathVolume = rebasedPhase1Volume + rebasedPhase2Volume;

				const rebasedRate = simpleRebaseRate(immediateRebasePair.b, originalPair.b, rate);

				sums.volumeWeightedSum += rebasedPathVolume * rebasedRate;
				sums.combinedVolume += rebasedPathVolume;
			}

			const volumeWeightedAverageRate = sums.volumeWeightedSum / sums.combinedVolume;
			rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate] = volumeWeightedAverageRate;
			return volumeWeightedAverageRate;
		}
	};

	/* Calculate the average of a volume-weighted spread of a pair. */
	const vwsaMemo = {};
	const volumeWeightedSpreadAverage = (baseSymbol, quoteSymbol) => {
		if (vwsaMemo[baseSymbol + "/" + quoteSymbol]) return vwsaMemo[baseSymbol + "/" + quoteSymbol];
		const pair = market[baseSymbol + "/" + quoteSymbol];
		const combinedVolume = getEMDVolume(pair);
		const weightedSumOfCurrentBids = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.b), 0);
		const weightedSumOfCurrentAsks = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.a), 0);
		const volumeWeightedBidAverage = weightedSumOfCurrentBids / combinedVolume;
		const volumeWeightedAskAverage = weightedSumOfCurrentAsks / combinedVolume;
		const vwsa = (volumeWeightedBidAverage + volumeWeightedAskAverage) / 2;
		vwsaMemo[baseSymbol + "/" + quoteSymbol] = vwsa;
		return vwsa;
	};

	/* Deeply rebase all market data of a pair. */
	const rebaseMarketData = (p) => {
		const result = {};
		Object.keys(p.m).forEach((exchangeID) => {
			const emd = p.m[exchangeID];
			result[exchangeID] = ({
				exchangeID: exchangeID,
				last_traded_dai: rebaseRate(marketRebaseSymbol, p.b, p.q, emd.l),
				current_bid_dai: rebaseRate(marketRebaseSymbol, p.b, p.q, emd.b),
				current_ask_dai: rebaseRate(marketRebaseSymbol, p.b, p.q, emd.a),
				volume_dai: rebaseRate(marketRebaseSymbol, p.b, p.q, emd.v),
			})
		});
		return result;
	};

	/* Deeply rebase the whole market. */
	const rebasedMarket = {};
	Object.keys(market).forEach((pKey) => {
		const p = market[pKey];
		rebasedMarket[pKey] = {
			base_symbol: p.b,
			quote_symbol: p.q,
			market_data: rebaseMarketData(p),
		}
	});

	return rebasedMarket;
	/*return _.reduce(Object.keys(market), (marketResult, pairKey) => {
		const pair = market[pairKey];
		rebasedMarket[pairKey] = {
			base_symbol: pair.b,
			quote_symbol: pair.q,
			market_data: _.reduce(Object.keys(pair.m), (result, exchangeID) => {
				const emd = pair.m[exchangeID];
				result[exchangeID] = ({
					exchangeID: exchangeID,
					last_traded_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.l),
					current_bid_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.b),
					current_ask_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.a),
					volume_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.v),
				});
				return result;
			}, {}),
		};
		return marketResult;
	}, {});*/
};

module.exports = { rebaseMarket };

