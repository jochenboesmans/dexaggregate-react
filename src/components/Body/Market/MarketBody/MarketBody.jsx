import React, { lazy, useContext } from "react";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import {
	ActivePageDispatchContext,
	MarketPageDispatchContext,
	MarketPageStateContext,
	ViewportStateContext,
} from "../../../../state/contexts/contexts";

const MarketPairName = lazy(() => import(`./Common/MarketPairName`));
const MarketPairSpread = lazy(() => import(`./Regular/RegularMarketPairSpread`));
const MarketPairLastPrice = lazy(() => import(`./Regular/MarketPairLastPrice`));
const MarketPairVolume = lazy(() => import(`./Regular/MarketPairVolume`));
const MobileMarketPairSpread = lazy(() => import(`./Mobile/MobileMarketPairSpread`));

const MarketBody = ({ entriesPerPage, filteredMarketLength, slicedMarket }) => {
	const { width: vw } = useContext(ViewportStateContext);
	const marketPage = useContext(MarketPageStateContext);
	const marketPageDispatch = useContext(MarketPageDispatchContext);
	const activePageDispatch = useContext(ActivePageDispatchContext);

	const innerContent = (p) => (vw < 760) ? (
		<>
			<MarketPairName p={p}/>
			<MobileMarketPairSpread p={p}/>
		</>
	) : (
		<>
			<MarketPairName p={p}/>
			<MarketPairSpread p={p}/>
			<MarketPairLastPrice p={p}/>
			<MarketPairVolume p={p}/>
		</>
	);

	const handleWheelEvent = (e) => {
		console.log(entriesPerPage);
		if (e.deltaY < 0 && marketPage > 0) {
			marketPageDispatch({ type: `DECREMENT` });
		} else if (e.deltaY > 0 && (marketPage * entriesPerPage) + entriesPerPage < filteredMarketLength) {
			marketPageDispatch({ type: `INCREMENT` });
		}
	};

	return (
		<TableBody onWheel={handleWheelEvent}>
			{slicedMarket.map(p => {
				return (
					<TableRow
						style={{ height: `4vh` }}
						hover
						onClick={() => activePageDispatch({ type: `SET`, payload: { ID: `PAIR`, pair: p } })}
						key={`${p.b}/${p.q}`}
					>
						{innerContent(p)}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default MarketBody;