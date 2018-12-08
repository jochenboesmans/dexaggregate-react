import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

import * as actions from "../../../../actions";
import {pages} from "../../../../model/pages";
import {formatPrice, formatVolume} from "../../../../util/formatFunctions";
import {rebaseCombinedVolume, rebaseLastPrice} from "../../../../util/marketFunctions";

import Spread from "./Spread";

class MarketBody extends Component {

	render() {
		if (!this.props.market.market) {
			return null;
		}
		const market = this.props.market.market;
		const searchFilter = this.props.searchFilter;
		const deltaY = this.props.deltaY;
		const displayedMarket = _.orderBy(market, [p =>
			rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ["desc"]);
		const filteredMarket = searchFilter ? _.filter(displayedMarket, p =>
			p.base_symbol.includes(searchFilter.toUpperCase()) ||
			p.quote_symbol.includes(searchFilter.toUpperCase())) : displayedMarket;
		const start = 0;
		const end = 10;
		const slicedMarket = filteredMarket.slice(start + deltaY, end + deltaY);
		return (
			<TableBody onWheel={(e) => {
				if (e.deltaY < 0 && deltaY > 9 && !searchFilter) {
					this.props.setDeltaY(deltaY - 10);
				} else if (e.deltaY > 0 && (deltaY < market.length - 10) && !searchFilter) {
					this.props.setDeltaY(deltaY + 10);
				}
			}}>
				{_.map(slicedMarket, p => {
						const last = formatPrice(rebaseLastPrice(market, p.base_symbol, p.quote_symbol, "DAI"));
						const combVol = formatVolume(rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI"));
						return (
							<TableRow hover onClick={() => {
								this.props.setPage({...pages.PAIR, pair: p});
								this.props.setSearchFilter(null);
							}} key={`${p.base_symbol}/${p.quote_symbol}`}>
								<TableCell>{`${p.base_symbol}/${p.quote_symbol}`}</TableCell>
								<Spread p={p} market={market}/>
								<TableCell numeric>{`${last}`}</TableCell>
								<TableCell numeric>{`${combVol}`}</TableCell>
							</TableRow>
						);
					}
				)}
			</TableBody>
		);
	}
}

export default connect(({market, searchFilter, deltaY}) => ({market, searchFilter, deltaY}), actions)(MarketBody);