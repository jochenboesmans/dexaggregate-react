import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import { PairBody } from "./PairBody/PairBody";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../actions";
import { pages } from "../../../model/pages";

import { PairButton } from "./PairButton/PairButton";
import { PairHead } from "./PairHead/PairHead";

const unconnectedPair = ({ market, activePage, setPage }) => {
	const { pair } = activePage;
	const m = market.market;
	const p = _.find(m,
	                 pairInMarket => pairInMarket.base_symbol === pair.base_symbol && pairInMarket.quote_symbol === pair.quote_symbol);

	if (p) {
		return (
			<div>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="stretch"
					style={{width: "80vw"}}
					spacing={8}
				>
					<PairButton p={p}/>
					<Grid item>
						<Table>
							<PairHead p={p}/>
							<PairBody p={p} market={m}/>
						</Table>
					</Grid>
				</Grid>
			</div>
		)
	} else {
		return (
			<div>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="stretch"
					spacing={8}
				>
					<Button fullWidth
					        onClick={() => {
						        setPage(pages.MARKET)
					        }}
					        style={{ fontSize: "24px" }}
					>
						Back
					</Button>
				</Grid>
			</div>
		)
	}
};

const Pair = connect(({ market, activePage, deltaY }) => ({ market, activePage, deltaY }), actions)(unconnectedPair);

export { Pair };