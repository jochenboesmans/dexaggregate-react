import React, { lazy } from "react";
import { connect } from "react-redux";
import { map } from "lodash/core";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import * as actions from "../../../../actions";
import { pages } from "../../../../model/pages";

const MarketPairName = lazy(() => import("./MarketPairName"));
const MarketPairSpread = lazy(() => import("./MarketPairSpread"));
const MarketPairLastPrice = lazy(() => import("./MarketPairLastPrice"));
const MarketPairVolume = lazy(() => import("./MarketPairVolume"));
const MobileMarketPairSpread = lazy(() => import("./MobileMarketPairSpread"));

const unconnectedMarketBody = ({ filteredMarketLength, slicedMarket, searchFilter, deltaY, setDeltaY, setPage, setSearchFilter, viewport }) => {

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const vw = viewport.width || initialVW;

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
		} else if(e.deltaY > 0 && (deltaY < filteredMarketLength - 10)) {
			setDeltaY(deltaY + 10);
		}
	};

	return (
		<TableBody onWheel={handleWheelEvent}>
			{map(slicedMarket, p => {
				return (
					<TableRow
						style={{ height: "4vh" }}
						hover
						onClick={() => {
							setPage({
								...pages.PAIR,
								pair: p
							});
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

const MarketBody = connect(({ searchFilter, deltaY, viewport }) => ({
	searchFilter,
	deltaY,
	viewport,
}), actions)(unconnectedMarketBody);

export default MarketBody;