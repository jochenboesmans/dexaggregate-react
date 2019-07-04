import React, {lazy, useContext, FC} from "react";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import {
	ActivePageDispatchContext,
	MarketPageDispatchContext,
	MarketPageStateContext,
	ViewportStateContext,
} from "../../../../state/contexts/contexts";

import {Pair} from "../../../../types/market";

const PairsTableRegularPairBody = lazy(() => import("./Regular/PairsTableRegularPairBody"));
const PairsTableMobilePairBody = lazy(() => import("./Mobile/PairsTableMobilePairBody"));

interface PropsType {
	entriesPerPage: number,
	filteredMarketLength: number,
	slicedMarket: Array<Pair>
}

const PairsTableBody: FC<PropsType> = ({entriesPerPage, filteredMarketLength, slicedMarket}) => {
	const { width: vw } = useContext(ViewportStateContext);
	const marketPage = useContext(MarketPageStateContext);
	const marketPageDispatch = useContext(MarketPageDispatchContext);
	const activePageDispatch = useContext(ActivePageDispatchContext);

	const innerContent = (pair) => (vw < 760) ?
		<PairsTableMobilePairBody pair={pair}/> : <PairsTableRegularPairBody pair={pair}/>;

	const handleWheelEvent = (e) => {
		if (e.deltaY < 0 && marketPage > 0) {
			marketPageDispatch({ type: "DECREMENT" });
		} else if (e.deltaY > 0 && (marketPage * entriesPerPage) + entriesPerPage < filteredMarketLength) {
			marketPageDispatch({ type: "INCREMENT" });
		}
	};

	return (
		<TableBody onWheel={handleWheelEvent}>
			{slicedMarket.map(p => {
				return (
					<TableRow
						style={{ height: "4vh" }}
						hover
						onClick={() => activePageDispatch({type: "SET_PAIR", payload: p})}
						key={`${p.baseSymbol}/${p.quoteSymbol}`}
					>
						{innerContent(p)}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default PairsTableBody;