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

	const sortedMarketData = p ? orderBy(p.m, [emd => emd.v], `desc`) : null;

	const handleClick = (exchangeID, p) => {
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

		const URL = exchangeURL[exchangeID](p);
		window.open(URL, `_blank`);
	};

	return (
		<TableBody>
			{sortedMarketData.map(emd => {
				const mostCompetitivePrices = {
					lowAsk: reduce(p.m, (min, emd) => emd.a < min ? emd.a : min, Number.MAX_VALUE),
					highBid : reduce(p.m, (max, emd) => emd.b > max ? emd.b : max, 0),
				};

				const innerContent = (vw < 760) ? <MobilePairBody emd={emd} exchanges={exchanges} mostCompetitivePrices={mostCompetitivePrices}/> :
					<RegularPairBody emd={emd} exchanges={exchanges} mostCompetitivePrices={mostCompetitivePrices}/>;

				return (
					<TableRow
						hover
	          onClick={() => handleClick(emd.e, p)}
	          key={emd.e}
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