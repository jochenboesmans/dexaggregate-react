import React, { lazy } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../actions";
import { pages } from "../../../../model/pages";

const MarketPairName = lazy(() => import("./MarketPairName"));
const MarketPairSpread = lazy(() => import("./MarketPairSpread"));
const MarketPairLastPrice = lazy(() => import("./MarketPairLastPrice"));
const MarketPairVolume = lazy(() => import("./MarketPairVolume"));
const MobileMarketPairSpread = lazy(() => import("./MobileMarketPairSpread"));

const TableBody = lazy(() => import("@material-ui/core/TableBody/TableBody"));
const TableRow = lazy(() => import("@material-ui/core/TableRow/TableRow"));

const unconnectedMarketBody = ({ filteredMarketLength, slicedMarket, deltaY, setDeltaY, setPage, viewport }) => {

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
			{slicedMarket.map(p => {
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
						key={`${p.b}/${p.q}`}
					>
						{innerContent(p)}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

const MarketBody = connect(({ deltaY, viewport }) => ({ deltaY, viewport }), actions)(unconnectedMarketBody);

export default MarketBody;