import React, { lazy, useContext } from "react";
import { object } from "prop-types";

import orderBy from "lodash/orderBy";
import reduce from "lodash/reduce";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import { ViewportStateContext, MarketStateContext } from "../../../../state/contexts/contexts";

import MobilePairBody from "./Mobile/MobilePairBody";
import RegularPairBody from "./Regular/RegularPairBody";

const PairExchangeName = lazy(() => import(`./Common/PairExchangeName`));
const MobilePairSpread = lazy(() => import(`./Mobile/MobilePairSpread`));

const PairBody = ({ p }) => {
	const { width: vw } = useContext(ViewportStateContext);
	const { exchanges } = useContext(MarketStateContext);

	const sortedMarketData = p ? orderBy(p.marketData, [emd => emd.baseVolume], `desc`) : null;

	const handleClick = (exchangeID, p) => {
		const exchangeURL = {
			"KYBER": (p) => `https://kyberswap.com/swap/${p.baseSymbol}_${p.quoteSymbol}`,
			"OASIS": (p) => `https://eth2dai.com/`,
			"PARADEX": (p) => `https://paradex.io/market/${p.quoteSymbol}-${p.baseSymbol}`,
			"DDEX": (p) => `https://ddex.io/trade/${p.baseSymbol}-${p.quoteSymbol}`,
			"IDEX": (p) => `https://idex.market/${p.baseSymbol}/${p.quoteSymbol}`,
			"RADAR": (p) => `https://app.radarrelay.com/${p.quoteSymbol}/${p.baseSymbol}`,
			"UNISWAP": (p) => `https://uniswap.exchange/swap`,
			"TOKENSTORE": (p) => `https://token.store/trade/${p.quoteSymbol}`,
			"ETHERDELTA": (p) => `https://etherdelta.com/#${p.quoteSymbol}-${p.baseSymbol}`
		};

		const URL = exchangeURL[exchangeID](p);
		window.open(URL, `_blank`);
	};

	return (
		<TableBody>
			{sortedMarketData.map(emd => {
				const mostCompetitivePrices = {
					lowAsk: reduce(p.marketData, (min, emd) => emd.currentAsk < min ? emd.currentAsk : min, Number.MAX_VALUE),
					highBid : reduce(p.marketData, (max, emd) => emd.currentBid > max ? emd.currentBid : max, 0),
				};

				const innerContent = (vw < 760) ? <MobilePairBody emd={emd} exchanges={exchanges} mostCompetitivePrices={mostCompetitivePrices}/> :
					<RegularPairBody emd={emd} exchanges={exchanges} mostCompetitivePrices={mostCompetitivePrices}/>;

				return (
					<TableRow
						hover
	          onClick={() => handleClick(emd.exchange, p)}
	          key={emd.exchange}
	          style={{ height: `4vh` }}
					>
						{innerContent}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

PairBody.propTypes = {
	p: object.isRequired,
};

export default PairBody;