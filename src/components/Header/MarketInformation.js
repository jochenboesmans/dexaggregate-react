import React, {Component} from "react";
import _ from "lodash";
import {connect} from "react-redux";

import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

import {formatTime, formatVolume} from "../../util/formatFunctions";
import {rebaseCombinedVolume} from "../../util/marketFunctions";

class MarketInformation extends Component {
	render() {
		const market = this.props.market;
		const combinedVolume = formatVolume(_.sumBy(market.market, p => rebaseCombinedVolume(market.market, p.base_symbol, p.quote_symbol, "DAI")));
		const exchangeNames = _.map(market.exchanges, exchange => exchange.name).join(", ");
		const marketSize = market.market ? market.market.length : 0;
		const marketTime = formatTime(market.timestamp);
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
}

export default connect(({market}) => ({market}))(MarketInformation);