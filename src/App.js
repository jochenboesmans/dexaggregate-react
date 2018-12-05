import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from "./actions";

import _ from "lodash";
import {rebaseCombinedVolume} from "./util/marketFunctions";

import {
	formatTime,
	formatVolume
} from "./util/formatFunctions";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Table from "@material-ui/core/Table/Table";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
	typography: {
		fontFamily: '"Segoe UI"',
		useNextVariants: true
	},
	overrides: {
		// Name of the component ⚛️ / style sheet
		MuiButton: {
			// Name of the rule
			root: {
				// Some CSS
				background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
				borderRadius: 3,
				border: 0,
				color: 'white',
				height: 48,
				padding: '0 30px',
				boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
			},
		}
	},

	palette: {
		primary: purple,
	}
});

class App extends Component {

	renderTitle() {
		const title = "ΣDEX";
		return (
			<div>
				<Typography variant="h1" align="center">
					{title}
				</Typography>
			</div>
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
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Combined Volume (24h) [DAI]</TableCell>
							<TableCell numeric>{combinedVolume}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Exchanges</TableCell>
							<TableCell numeric>{exchangeNames}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Pairs</TableCell>
							<TableCell numeric>{marketSize}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Last Update</TableCell>
							<TableCell numeric>{marketTime}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	}


	render() {
		return (
			<div className="App">
				<MuiThemeProvider theme={theme}>
					<Grid
						container
						direction="column"
						alignItems="center"
						justify="space-between"
						spacing={8}
					>
						<Grid item xs>
						{this.renderTitle()}
						</Grid>
						<Grid item xs>
							{this.renderMarketInformation()}
						</Grid>
						<Grid item xs>
							<Divider/>
						</Grid>
						<Grid item xs>
							{this.renderActivePage()}
						</Grid>
					</Grid>
				</MuiThemeProvider>
			</div>
		)
	}
}

function mapStateToProps({activePage, market}) {
	return {activePage, market};
}

export default connect(mapStateToProps, actions)(App);
