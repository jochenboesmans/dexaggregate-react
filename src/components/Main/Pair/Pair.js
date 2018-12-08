import React, {Component} from "react";
import {connect} from 'react-redux';
import _ from "lodash";

import Table from '@material-ui/core/Table/Table';
import Grid from "@material-ui/core/Grid/Grid";

import * as actions from "../../../actions";

import PairButton from "./PairButton/PairButton";
import PairHead from "./PairHead/PairHead";
import PairBody from "./PairBody/PairBody";
import Button from "@material-ui/core/Button/Button";
import {pages} from "../../../model/pages";

class Pair extends Component {

	render() {
		const pair = this.props.activePage.pair;
		const market = this.props.market.market;
		const p = _.find(market, pairInMarket => pairInMarket.base_symbol === pair.base_symbol && pairInMarket.quote_symbol === pair.quote_symbol);

		if (p) {
			return (
				<div>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="stretch"
					>
						<PairButton p={p}/>
						<Grid item>
							<Table>
								<PairHead p={p}/>
								<PairBody p={p} market={market}/>
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
					>
						<Button fullWidth
								onClick={() => {
									this.props.setPage(pages.MARKET)
								}}
								style={{fontSize: "24px"}}
						>
							Back
						</Button>
					</Grid>
				</div>
			)
		}
	}

}

export default connect(({market, activePage, tablePage, searchFilter, deltaY}) => ({market, activePage, tablePage, searchFilter, deltaY}), actions)(Pair);