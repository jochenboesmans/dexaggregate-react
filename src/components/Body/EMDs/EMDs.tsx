import React, { lazy, useContext, FC } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";

import {
	ViewportStateContext,
	ActivePageStateContext,
	MarketStateContext,
} from "../../../state/contexts/contexts";

import {Pair as PairType} from "../../../types/market";

const EMDsButton = lazy(() => import("./EMDsButton"));
const EMDsTableHead = lazy(() => import("./EMDsTableHead"));
const EMDsTableBody = lazy(() => import("./EMDsTableBody/EMDsTableBody"));

const EMDs: FC = () => {
	const {width: vw} = useContext(ViewportStateContext);
	const {market: m} = useContext(MarketStateContext);
	const {pair: activePair}  = useContext(ActivePageStateContext);

	const pair: PairType = m.find(mPair =>
		mPair.baseSymbol === activePair.baseSymbol && mPair.quoteSymbol === activePair.quoteSymbol);

	const colWidths = (vw < 760) ? ["20%", "80%"] : ["10%", "45%", "20%", "25%"];

	return (
		<Grid container direction="column" spacing={1}>
			<Grid item>
				<EMDsButton pair={pair}/>
			</Grid>
			<Grid item>
				<Table padding="checkbox" style={{tableLayout: "fixed"}}>
					<colgroup>{colWidths.map((cw, i) => <col key={i} style={{width: cw}}/>)}</colgroup>
					<EMDsTableHead/>
					<EMDsTableBody pair={pair}/>
				</Table>
			</Grid>
		</Grid>
	);
};

export default EMDs;