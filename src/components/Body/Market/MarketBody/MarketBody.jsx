import React, { lazy, useContext } from "react";
import { number, array } from "prop-types";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import {
	ActivePageDispatchContext,
	MarketPageDispatchContext,
	MarketPageStateContext,
	ViewportStateContext,
} from "../../../../state/contexts/contexts";

const RegularMarketBody = lazy(() => import(`./Regular/RegularMarketBody`));
const MobileMarketBody = lazy(() => import(`./Mobile/MobileMarketBody`));

const MarketBody = ({ entriesPerPage, filteredMarketLength, slicedMarket }) => {
	const { width: vw } = useContext(ViewportStateContext);
	const marketPage = useContext(MarketPageStateContext);
	const marketPageDispatch = useContext(MarketPageDispatchContext);
	const activePageDispatch = useContext(ActivePageDispatchContext);

	const innerContent = (p) => (vw < 760) ? <MobileMarketBody p={p}/> : <RegularMarketBody p={p}/>;

	const handleWheelEvent = (e) => {
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

MarketBody.propTypes = {
	entriesPerPage: number.isRequired,
	filteredMarketLength: number.isRequired,
	slicedMarket: array.isRequired,
};

export default MarketBody;