import React, { lazy } from "react";
import { connect } from "react-redux";

import orderBy from "lodash/orderBy";

import {
	highestCurrentBidAcrossExchanges,
	lowestCurrentAskAcrossExchanges
} from "../../../../util/marketFunctions";

const TableBody = lazy(() => import("@material-ui/core/TableBody/TableBody"));
const TableRow = lazy(() => import("@material-ui/core/TableRow/TableRow"));

const PairExchangeName = lazy(() => import("./PairExchangeName"));
const PairSpread = lazy(() => import("./PairSpread"));
const PairLastPrice = lazy(() => import("./PairLastPrice"));
const PairVolume = lazy(() => import("./PairVolume"));
const MobilePairSpread = lazy(() => import("./MobilePairSpread"));

const unconnectedPairBody = ({ p, market, viewport }) => {
	const sortedMarketData = p ? orderBy(p.m, [emd => emd.v], "desc") : null;

	const lowAsk = lowestCurrentAskAcrossExchanges(market, p.b, p.q);
	const highBid = highestCurrentBidAcrossExchanges(market, p.b, p.q);

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const vw = viewport.width || initialVW;
	return (
		<TableBody>
			{sortedMarketData.map(emd => {
				if(vw < 760) {
					return (
						<TableRow hover
						          onClick={() => handleClick(emd.e, p)}
						          key={emd.e}
						          style={{ height: "4vh" }}
						>
							<PairExchangeName emd={emd}/>
							<MobilePairSpread emd={emd} lowAsk={lowAsk} highBid={highBid}/>
						</TableRow>
					);
				} else {
					return (
						<TableRow hover
						          onClick={() => handleClick(emd.e, p)}
						          key={emd.e}
						          style={{ height: "4vh" }}
						>
							<PairExchangeName emd={emd}/>
							<PairSpread emd={emd} lowAsk={lowAsk} highBid={highBid} />
							<PairLastPrice emd={emd}/>
							<PairVolume emd={emd}/>
						</TableRow>
					)
				}
			})}
		</TableBody>
	)
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

const handleClick = (exchangeID, p) => {
	const URL = exchangeURL[exchangeID](p);
	window.open(URL, "_blank");
};

const PairBody = connect(({ viewport }) => ({ viewport }), null)(unconnectedPairBody);
export default PairBody;