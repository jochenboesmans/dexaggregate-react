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

	const handleClick = (exchange, p) => {
		const exchangeURL = {
			"kyber": (p) => `https://kyberswap.com/swap/${p.baseSymbol}_${p.quoteSymbol}`,
			"oasis": (p) => `https://eth2dai.com/`,
			"paradex": (p) => `https://paradex.io/market/${p.quoteSymbol}-${p.baseSymbol}`,
			"ddex": (p) => `https://ddex.io/trade/${p.baseSymbol}-${p.quoteSymbol}`,
			"idex": (p) => `https://idex.market/${p.baseSymbol}/${p.quoteSymbol}`,
			"radar": (p) => `https://app.radarrelay.com/${p.quoteSymbol}/${p.baseSymbol}`,
			"uniswap": (p) => `https://uniswap.exchange/swap`,
			"tokenstore": (p) => `https://token.store/trade/${p.quoteSymbol}`,
		};

		const URL = exchangeURL[exchange](p);
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