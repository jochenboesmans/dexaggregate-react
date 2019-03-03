import React, { lazy } from "react";
import { connect } from "react-redux";

import * as actions from "../../../actions";
import { pages } from "../../../model/pages";

const Button = lazy(() => import("@material-ui/core/Button/Button"));
const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Table = lazy(() => import("@material-ui/core/Table/Table"));

const PairButton = lazy(() => import("./PairButton"));
const PairHead = lazy(() => import("./PairHead"));
const PairBody = lazy(() => import("./PairBody/PairBody"));

const unconnectedPair = ({ market, activePage, setPage, viewport }) => {
	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const vw = viewport.width || initialVW;

	const { pair: activePair }  = activePage;
	const m = market.market;

	const p = m.find(mPair =>
		mPair.base_symbol === activePair.base_symbol && mPair.quote_symbol === activePair.quote_symbol);

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
					<PairBody p={p} market={m} exchanges={market.exchanges}/>
				</Table>
			</Grid>
		</>
	) : (
		<Grid item>
			<Button fullWidth
		            onClick={() => {
			            setPage(pages.MARKET)
		            }}
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

const Pair = connect(({ market, activePage, deltaY, viewport }) => ({ market, activePage, deltaY, viewport }), actions)(unconnectedPair);
export default Pair;