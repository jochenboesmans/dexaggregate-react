import React, { lazy, useContext } from "react";

import { ViewportStateContext } from "../../../contexts/contexts";
import { ActivePageDispatchContext, ActivePageStateContext } from "../../../contexts/contexts";
import { MarketStateContext } from "../../../contexts/contexts";

const Button = lazy(() => import("@material-ui/core/Button/Button"));
const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Table = lazy(() => import("@material-ui/core/Table/Table"));

const PairButton = lazy(() => import("./PairButton"));
const PairHead = lazy(() => import("./PairHead"));
const PairBody = lazy(() => import("./PairBody/PairBody"));

const Pair = () => {
	const { width: vw } = useContext(ViewportStateContext);
	const { market: m, exchanges } = useContext(MarketStateContext);
	const { pair: activePair }  = useContext(ActivePageStateContext);
	const activePageDispatch = useContext(ActivePageDispatchContext);

	const p = m.find(mPair =>
		mPair.b === activePair.b && mPair.q === activePair.q);

	const colGroup = (vw < 760) ? (
		<colgroup>
			<col style={{ width: "20%" }}/>
			<col style={{ width: "80%" }}/>
		</colgroup>
	) : (
		<colgroup>
			<col style={{ width: "15%" }}/>
			<col style={{ width: "40%" }}/>
			<col style={{ width: "20%" }}/>
			<col style={{ width: "25%" }}/>
		</colgroup>
	);

	const innerContent = p ? (
		<>
			<Grid item>
				<PairButton p={p}/>
			</Grid>
			<Grid item>
				<Table
					padding="dense"
					style={{ tableLayout: "fixed" }}>
					{colGroup}
					<PairHead p={p}/>
					<PairBody p={p} market={m} exchanges={exchanges}/>
				</Table>
			</Grid>
		</>
	) : (
		<Grid item>
			<Button
				fullWidth
		    onClick={ () => activePageDispatch({ type: `RESET` }) }
		    style={{ fontSize: "24px" }}
			>
				Back
			</Button>
		</Grid>
	);

	return (
		<Grid
			container
			direction="column"
			spacing={8}
		>
			{innerContent}
		</Grid>
	);
};

export default Pair;