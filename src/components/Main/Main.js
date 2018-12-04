/* External libraries */
import React, { Component } from 'react';
import {connect} from "react-redux";
import _ from "lodash";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import * as actions from "../../actions";

import {pages} from "../../model/pages";

import {
	rebaseCombinedVolume,
	rebaseHighestCurrentBid,
	rebaseLastPrice,
	rebaseLowestCurrentAsk
} from "../../util/marketFunctions";
import TextField from "@material-ui/core/TextField/TextField";
import {formatPrice, formatVolume} from "../../util/formatFunctions";





/**
 * Simple React app that displays market data from various exchanges.
 */
class Main extends Component {

	renderMarket() {
		return (
			<div>
				<Grid
					container
					direction="column"
					justify="center"
					spacing={8}
					alignItems="center"
				>
					<Grid item >
						<TextField
							className="root"
							id="token-search"
							label="Token search"
							type="search"
							variant="outlined"
							onChange={this.handleSearchChange}
						/>
					</Grid>
					<Grid item>
						<Table>
							<TableHead className="tableHead">
								<TableRow>
									<TableCell>Base Token / Quote Token</TableCell>
									<TableCell numeric>Quote Token Current Spread [DAI]<br/> (innermost spread of all exchange spreads)</TableCell>
									<TableCell numeric>Quote Token Last Price [DAI]<br/> (volume-weight of exchanges' last price)</TableCell>
									<TableCell numeric>Volume [DAI]<br/> (24h combined volume of all exchanges)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.renderTableBody()}
							</TableBody>
						</Table>
					</Grid>
				</Grid>
			</div>
		)
	}

	renderTableBody() {
		const market = this.props.market.market;
		const searchFilter = this.props.searchFilter;

		if (!market) {
			return null;
		} else {

			let filteredMarket = _.orderBy(market, [p => rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ['desc']);
			if (searchFilter) {
				filteredMarket = _.filter(filteredMarket, p =>  p.base_symbol.includes(searchFilter.toUpperCase()) || p.quote_symbol.includes(searchFilter.toUpperCase()))
			}
			return _.map(filteredMarket.slice(0,50),
				p => {
					const innerBid = formatPrice(rebaseHighestCurrentBid(market, p.base_symbol, p.quote_symbol, "DAI"));
					const innerAsk = formatPrice(rebaseLowestCurrentAsk(market, p.base_symbol, p.quote_symbol, "DAI"));
					const last = formatPrice(rebaseLastPrice(market, p.base_symbol, p.quote_symbol, "DAI"));
					const combVol = formatVolume(rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI"));

					return (
						<TableRow onClick={() => {
							this.props.setPage({...pages.PAIR, pair: p});
							this.props.setSearchFilter(null);
						}} key={`${p.base_symbol}/${p.quote_symbol}`}>
							<TableCell>{`${p.base_symbol}/${p.quote_symbol}`}</TableCell>
							<TableCell numeric>{`${innerBid} - ${innerAsk}`}</TableCell>
							<TableCell numeric>{`${last}`}</TableCell>
							<TableCell numeric>{`${combVol}`}</TableCell>
						</TableRow>
					);
				}
			)
		}
	}

	handleSearchChange = event => {
		this.props.setSearchFilter((event.target.value).toUpperCase());
	};

	render() {
		return (
			<div className="Main">
				{this.renderMarket()}
			</div>
		);
	}
}

function mapStateToProps({market, searchFilter, exchanges}) {
	return {market, searchFilter, exchanges};
}

export default connect(mapStateToProps, actions)(Main);