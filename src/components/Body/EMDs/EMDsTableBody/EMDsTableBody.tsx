import React, {lazy, useContext, FC} from "react";

import orderBy from "lodash/orderBy";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import {ViewportStateContext} from "../../../../state/contexts/contexts";
import {ExchangeMarketData, Pair} from "../../../../types/market";
import {innerAsk, innerBid} from "../../../../util/aggregate";

const EMDsTableMobileEMDBody = lazy(() => import("./Mobile/EMDsTableMobileEMDBody"));
const EMDsTableRegularEMDBody = lazy(() => import("./Regular/EMDsTableRegularEMDBody"));

interface PropsType {pair: Pair}
const EMDsTableBody: FC<PropsType> = ({pair}) => {
	const {width: vw} = useContext(ViewportStateContext);
	const sortedMarketData: Array<ExchangeMarketData> = pair ? orderBy(pair.marketData, [emd => emd.baseVolume], "desc") : null;

	const handleClick = (exchange, p) => {
		const exchangeURL = {
			"kyber": (p) => `https://kyberswap.com/swap/${p.baseSymbol}_${p.quoteSymbol}`,
			"oasis": () => `https://eth2dai.com/`,
			"paradex": (p) => `https://paradex.io/market/${p.quoteSymbol}-${p.baseSymbol}`,
			"ddex": (p) => `https://ddex.io/trade/${p.baseSymbol}-${p.quoteSymbol}`,
			"idex": (p) => `https://idex.market/${p.baseSymbol}/${p.quoteSymbol}`,
			"radar": (p) => `https://app.radarrelay.com/${p.quoteSymbol}/${p.baseSymbol}`,
			"uniswap": () => `https://uniswap.exchange/swap`,
			"tokenstore": (p) => `https://token.store/trade/${p.quoteSymbol}`,
		};

		const URL = exchangeURL[exchange](p);
		window.open(URL, "_blank");
	};

	return (
		<TableBody>
			{sortedMarketData.map(emd => {
				const mostCompetitivePrices = {lowAsk: innerAsk(pair), highBid : innerBid(pair)};

				const innerContent = (vw < 760) ?
					<EMDsTableMobileEMDBody emd={emd} mostCompetitivePrices={mostCompetitivePrices}/> :
					<EMDsTableRegularEMDBody emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>;

				return (
					<TableRow
						hover
						onClick={() => handleClick(emd.exchange, pair)}
						key={emd.exchange}
						style={{height: "4vh"}}
					>
						{innerContent}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default EMDsTableBody;