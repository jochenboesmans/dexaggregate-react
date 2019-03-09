import React, { lazy, useContext } from "react";

import orderBy from "lodash/orderBy";
import reduce from "lodash/reduce";

import { ViewportStateContext } from "../../../../contexts/contexts";
import { MarketStateContext } from "../../../../contexts/contexts";

const TableBody = lazy(() => import("@material-ui/core/TableBody/TableBody"));
const TableRow = lazy(() => import("@material-ui/core/TableRow/TableRow"));

const PairExchangeName = lazy(() => import("./PairExchangeName"));
const PairSpread = lazy(() => import("./PairSpread"));
const PairLastPrice = lazy(() => import("./PairLastPrice"));
const PairVolume = lazy(() => import("./PairVolume"));
const MobilePairSpread = lazy(() => import("./MobilePairSpread"));

const PairBody = ({ p }) => {
	const sortedMarketData = p ? orderBy(p.m, [emd => emd.v], "desc") : null;

	const { width: vw } = useContext(ViewportStateContext);
	const { exchanges } = useContext(MarketStateContext);

	const handleClick = (exchangeID, p) => {
		const URL = exchangeURL[exchangeID](p);
		window.open(URL, "_blank");
	};

	const exchangeURL = {
		"KYBER": (p) => `https://kyberswap.com/swap/${p.b}_${p.q}`,
		"OASIS": (p) => `https://eth2dai.com/`,
		"PARADEX": (p) => `https://paradex.io/market/${p.q}-${p.b}`,
		"DDEX": (p) => `https://ddex.io/trade/${p.b}-${p.q}`,
		"IDEX": (p) => `https://idex.market/${p.b}/${p.q}`,
		"RADAR": (p) => `https://app.radarrelay.com/${p.q}/${p.b}`,
		"UNISWAP": (p) => `https://uniswap.exchange/swap`,
		"TOKENSTORE": (p) => `https://token.store/trade/${p.q}`,
		"ETHERDELTA": (p) => `https://etherdelta.com/#${p.q}-${p.b}`
	};

	return (
		<TableBody>
			{sortedMarketData.map(emd => {
				const mostCompetitivePrices = {
					lowAsk: reduce(p.m, (min, emd) => emd.a < min ? emd.a : min, Number.MAX_VALUE),
					highBid : reduce(p.m, (max, emd) => emd.b > max ? emd.b : max, 0),
				};

				if (vw < 760) {
					return (
						<TableRow
							hover
		          onClick={() => handleClick(emd.e, p)}
		          key={emd.e}
		          style={{ height: "4vh" }}
						>
							<PairExchangeName exchangeName={exchanges[emd.e].name}/>
							<MobilePairSpread emd={emd} mostCompetitivePrice={mostCompetitivePrices}/>
						</TableRow>
					);
				} else {
					return (
						<TableRow
							hover
							onClick={() => handleClick(emd.e, p)}
							key={emd.e}
							style={{ height: "4vh" }}
						>
							<PairExchangeName exchangeName={exchanges[emd.e].name}/>
							<PairSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
							<PairLastPrice emd={emd}/>
							<PairVolume emd={emd}/>
						</TableRow>
					)
				}
			})}
		</TableBody>
	)
};

export default PairBody;