import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import * as actions from "../../../../actions";
import { pages } from "../../../../model/pages";

import { MarketPairName } from "./MarketPairName";
import { MarketPairSpread } from "./MarketPairSpread";
import { MarketPairLastPrice } from "./MarketPairLastPrice";
import { MarketPairVolume } from "./MarketPairVolume";

import { MobileMarketPairSpread } from "./MarketPairSpread";

const unconnectedMarketBody = ({ market, searchFilter, deltaY, setDeltaY, setPage, setSearchFilter, viewport }) => {
	if(!market.market) return <div>Loading...</div>;

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const vw = viewport.width || initialVW;

	const filteredMarket = searchFilter ? _.filter(market.market, p => p.base_symbol.includes(searchFilter.toUpperCase()) || p.quote_symbol.includes(searchFilter.toUpperCase()) || _.find(p.market_data, emd => emd.exchangeID.includes(searchFilter.toUpperCase()))) : market.market;
	const orderedMarket = _.orderBy(filteredMarket, [p => _.reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0)], ["desc"]);
	const slicedMarket = orderedMarket.slice(0 + deltaY, 10 + deltaY);

	const innerContent = (p) => (vw < 760) ? (
		<>
			<MarketPairName p={p} />
			<MobileMarketPairSpread p={p} />
		</>
	) : (
		<>
			<MarketPairName p={p} />
			<MarketPairSpread p={p} />
			<MarketPairLastPrice p={p} />
			<MarketPairVolume p={p} />
		</>
	);

	const handleWheelEvent = (e) => {
		if(e.deltaY < 0 && deltaY > 9) {
			setDeltaY(deltaY - 10);
		} else if(e.deltaY > 0 && (deltaY < Object.keys(filteredMarket).length - 10)) {
			setDeltaY(deltaY + 10);
		}
	};

	return (
		<TableBody onWheel={handleWheelEvent}>
			{_.map(slicedMarket, p => {
				return (
					<TableRow
						style={{ height: "4vh" }}
						hover
						onClick={() => {
							setPage({
								...pages.PAIR,
								pair: p
							});
							setSearchFilter(null);
						}}
						key={`${p.base_symbol}/${p.quote_symbol}`}
					>
						{innerContent(p)}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

const MarketBody = connect(({ market, searchFilter, deltaY, viewport }) => ({
	market,
	searchFilter,
	deltaY,
	viewport,
}), actions)(unconnectedMarketBody);

export { MarketBody };