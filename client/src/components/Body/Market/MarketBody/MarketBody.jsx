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

export { MarketBody };