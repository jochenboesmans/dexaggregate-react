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
import TablePagination from '@material-ui/core/TablePagination';

import * as actions from "../../actions";

import {pages} from "../../model/pages";

import {
	rebaseCombinedVolume,
	rebaseHighestCurrentBid,
	rebaseLastPrice,
	rebaseLowestCurrentAsk
} from "../../util/marketFunctions";
import TextField from "@material-ui/core/TextField/TextField";
import {
	formatPrice,
	formatVolume,
	formatPercentage
} from "../../util/formatFunctions";



/**
 * Simple React app that displays market data from various exchanges.
 */
class Main extends Component {

	renderMarket() {
		const page = this.props.tablePage;
		const rowsPerPage = 10;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, (this.props.market.market ? this.props.market.market.length : 0) - page * rowsPerPage);
		return (
			<div>
				<Grid
					container
					direction="column"
					justify="center"
					spacing={8}
					alignItems="center"
				>
					<Grid item>
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
									<TableCell style={{color: "black"}}>Base Token / Quote Token</TableCell>
									<TableCell style={{color: "black"}} numeric>Quote Token Current Spread [DAI]<br/> (innermost spread of all exchange spreads)</TableCell>
									<TableCell style={{color: "black"}} numeric>Quote Token Last Price [DAI]<br/> (volume-weight of exchanges' last price)</TableCell>
									<TableCell style={{color: "black"}} numeric>Volume [DAI]<br/> (24h combined volume of all exchanges)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.renderTableBody()}
								{emptyRows > 0 && (
									<TableRow style={{ height: 48 * emptyRows }}>
										<TableCell colSpan={4} />
									</TableRow>
								)}
							</TableBody>
							<TableRow>
							<TablePagination
								rowsPerPageOptions={10}
								component="div"
								count={this.props.market.market ? this.props.market.market.length : 0}
								rowsPerPage={10}
								page={this.props.tablePage}
								onChangePage={this.handleChangePage}
							/>
							</TableRow>
						</Table>
					</Grid>
				</Grid>
			</div>
		)
	}

	renderTableBody() {
		const page = this.props.tablePage;
		const rowsPerPage = 10;
		const market = this.props.market.market;
		const searchFilter = this.props.searchFilter;

		if (!market) {
			return null;
		} else {

			let filteredMarket = _.orderBy(market, [p => rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ['desc']);
			if (searchFilter) {
				filteredMarket = _.filter(filteredMarket, p =>  p.base_symbol.includes(searchFilter.toUpperCase()) || p.quote_symbol.includes(searchFilter.toUpperCase()))
			}
			return _.map(filteredMarket.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
				p => {
					const innerBid = formatPrice(rebaseHighestCurrentBid(market, p.base_symbol, p.quote_symbol, "DAI"));
					const innerAsk = formatPrice(rebaseLowestCurrentAsk(market, p.base_symbol, p.quote_symbol, "DAI"));
					const last = formatPrice(rebaseLastPrice(market, p.base_symbol, p.quote_symbol, "DAI"));
					const combVol = formatVolume(rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI"));


					return (
						<TableRow hover onClick={() => {
							this.props.setPage({...pages.PAIR, pair: p});
							this.props.setSearchFilter(null);
						}} key={`${p.base_symbol}/${p.quote_symbol}`}>
							<TableCell>{`${p.base_symbol}/${p.quote_symbol}`}</TableCell>
							{this.renderSpread(p)}
							{/*<TableCell numeric>{`${innerBid} - ${innerAsk} (${spreadPercentage})`}</TableCell>*/}
							<TableCell numeric>{`${last}`}</TableCell>
							<TableCell numeric>{`${combVol}`}</TableCell>
						</TableRow>
					);
				}
			)
		}
	}

	renderSpread(p) {
		const innerBid = formatPrice(rebaseHighestCurrentBid(this.props.market.market, p.base_symbol, p.quote_symbol, "DAI"));
		const innerAsk = formatPrice(rebaseLowestCurrentAsk(this.props.market.market, p.base_symbol, p.quote_symbol, "DAI"));
		const spreadPercentage = `${formatPercentage(rebaseLowestCurrentAsk(this.props.market.market, p.base_symbol, p.quote_symbol, "DAI") / rebaseHighestCurrentBid(this.props.market.market, p.base_symbol, p.quote_symbol, "DAI") - 1)}`;
		if (rebaseLowestCurrentAsk(this.props.market.market, p.base_symbol, p.quote_symbol, "DAI") / rebaseHighestCurrentBid(this.props.market.market, p.base_symbol, p.quote_symbol, "DAI") >= 0.9999) {
			return <TableCell numeric>{`${innerBid} - ${innerAsk} (${spreadPercentage})`}</TableCell>
		} else {
			return <TableCell style={{color: "red"}} numeric>{`${innerBid} - ${innerAsk} (${spreadPercentage})`}</TableCell>
		}
	}

	handleSearchChange = event => {
		this.props.setSearchFilter((event.target.value).toUpperCase());
	};

	handleChangePage = (event, page) => {
		this.props.setTablePage(page)
	};

	render() {
		return (
			<div className="Main">
				{this.renderMarket()}
			</div>
		);
	}
}

function mapStateToProps({market, searchFilter, exchanges, tablePage}) {
	return {market, searchFilter, exchanges, tablePage};
}

export default connect(mapStateToProps, actions)(Main);