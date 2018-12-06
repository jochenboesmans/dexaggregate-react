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
		const market = this.props.market.market;
		const searchFilter = this.props.searchFilter;
		if (!market) {
			return null;
		} else {
			const displayedMarket = _.orderBy(market, [p => rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ['desc']);
			const filteredMarket = searchFilter ? _.filter(displayedMarket,
					p => p.base_symbol.includes(searchFilter.toUpperCase())
						|| p.quote_symbol.includes(searchFilter.toUpperCase())) : displayedMarket;
			const start = 0;
			const end = 10;
			const slicedMarket = filteredMarket.slice(start + this.props.deltaY, end + this.props.deltaY);
			return _.map(slicedMarket, p => {
					const last = formatPrice(rebaseLastPrice(market, p.base_symbol, p.quote_symbol, "DAI"));
					const combVol = formatVolume(rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI"));

					return (
						<TableBody onWheel={(e) => {
							if (e.deltaY < 0 && this.props.deltaY > 9) {
								this.props.setDeltaY(this.props.deltaY - 10);
							} else if (e.deltaY > 0 && this.props.deltaY <= (this.props.market ? this.props.market.market.length : 0) - 9) {
								this.props.setDeltaY(this.props.deltaY + 10);
							}
						}}>
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
		}
	}
}

const mapStateToProps = ({tablePage, market, searchFilter, deltaY}) => ({tablePage, market, searchFilter, deltaY});
export default connect(mapStateToProps, actions)(MarketBody);