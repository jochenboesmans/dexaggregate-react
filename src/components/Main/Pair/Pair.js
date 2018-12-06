import React, {Component} from "react";
import {connect} from 'react-redux';
import _ from "lodash";

import Table from '@material-ui/core/Table/Table';
import Grid from "@material-ui/core/Grid/Grid";

import * as actions from "../../../actions";

import PairButton from "./PairButton/PairButton";
import PairHead from "./PairHead/PairHead";
import PairBody from "./PairBody/PairBody";

class Pair extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false
		}
	}
	render() {
		const pair = this.props.activePage.pair;
		const market = this.props.market.market;
		const p = _.find(market, pairInMarket => pairInMarket.base_symbol === pair.base_symbol && pairInMarket.quote_symbol === pair.quote_symbol);
		const sortedMarketData = _.orderBy(p.market_data, [emd => emd.volume], "desc");
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
							<PairBody p={p} market={market} sortedMarketData={sortedMarketData}/>
						</Table>
					</Grid>
				</Grid>
			</div>
		);
	}

}

export default connect(({market, activePage}) => ({market, activePage}), actions)(Pair);