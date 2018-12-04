import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from "./actions";

import _ from "lodash";
import {rebaseCombinedVolume} from "./util/marketFunctions";

import {
	formatTime,
	formatVolume
} from "./util/formatFunctions";
import Paper from "@material-ui/core/es/Paper/Paper";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";

class App extends Component {

	renderTitle() {
		const title = "ΣDEX";
		return (
			<Typography variant="h1" align="center">
				{title}
			</Typography>
		)
	}
	renderActivePage() {
		return this.props.activePage.view;
	}

	renderMarketInformation() {
		const combinedVolume = formatVolume(_.sumBy(this.props.market.market, p => rebaseCombinedVolume(this.props.market.market, p.base_symbol, p.quote_symbol, "DAI")));
		const exchangeNames = _.map(this.props.market.exchanges, exchange => exchange.name).join(", ");
		const marketSize = this.props.market.market ? this.props.market.market.length : 0;
		const marketTime = formatTime(this.props.market.timestamp);
		return (
			<div>
				<Paper>
					<Typography variant="h4">
						Market Information
					</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Combined Volume (24h) [DAI]</TableCell>
								<TableCell>Exchanges</TableCell>
								<TableCell>Pairs</TableCell>
								<TableCell>Last Update</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>{combinedVolume}</TableCell>
								<TableCell>{exchangeNames}</TableCell>
								<TableCell numeric>{marketSize}</TableCell>
								<TableCell>{marketTime}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
			</div>
		)
	}


	render() {
		return (
			<div className="App">
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={24}
				>
					<Grid item>
						{this.renderTitle()}
					</Grid>
					<Grid item>
						{this.renderMarketInformation()}
					</Grid>
					<Grid item>
						{this.renderActivePage()}
					</Grid>
				</Grid>
			</div>
		)
	}
}

function mapStateToProps({activePage, market}) {
	return {activePage, market};
}

export default connect(mapStateToProps, actions)(App);
