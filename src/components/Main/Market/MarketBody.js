import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {
	rebaseCombinedVolume,
	rebaseLastPrice
} from "../../../util/marketFunctions";
import {formatPrice, formatVolume} from "../../../util/formatFunctions";
import TableRow from "@material-ui/core/TableRow/TableRow";
import {pages} from "../../../model/pages";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Spread from "./Spread";
import * as actions from "../../../actions";
import TableBody from "@material-ui/core/TableBody/TableBody";

class MarketBody extends Component {
	render() {
		const rowsPerPage = 10;
		const page = this.props.tablePage;
		const market = this.props.market.market;
		const searchFilter = this.props.searchFilter;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, (this.props.market.market ? this.props.market.market.length : 0) - page * rowsPerPage);

		if (!market) {
			return null;
		} else {
			let displayedMarket = _.orderBy(market, [p => rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ['desc']);
			if (searchFilter) {
				displayedMarket = _.filter(displayedMarket, p => p.base_symbol.includes(searchFilter.toUpperCase()) || p.quote_symbol.includes(searchFilter.toUpperCase()))
			}
			displayedMarket = displayedMarket.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
			const nonEmptyTableRows = _.map(displayedMarket, p => {
					const last = formatPrice(rebaseLastPrice(market, p.base_symbol, p.quote_symbol, "DAI"));
					const combVol = formatVolume(rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI"));

					return (
						<TableBody>
						<TableRow hover onClick={() => {
							this.props.setPage({...pages.PAIR, pair: p});
							this.props.setSearchFilter(null);
						}} key={`${p.base_symbol}/${p.quote_symbol}`}>
							<TableCell>{`${p.base_symbol}/${p.quote_symbol}`}</TableCell>
							<Spread p={p} market={market}/>
							<TableCell numeric>{`${last}`}</TableCell>
							<TableCell numeric>{`${combVol}`}</TableCell>
						</TableRow>

						</TableBody>
					);
				}
			);
			let emptyTableRows;
			if (emptyRows > 0) {
				emptyTableRows = (
					<TableRow style={{height: 48 * emptyRows}}>
						<TableCell colSpan={4}/>
					</TableRow>
				)
			} else {
				emptyTableRows = null;
			}
			return _.concat(nonEmptyTableRows, emptyTableRows);
		}
	}
}

const mapStateToProps = ({tablePage, market, searchFilter}) => ({tablePage, market, searchFilter});
export default connect(mapStateToProps, actions)(MarketBody);