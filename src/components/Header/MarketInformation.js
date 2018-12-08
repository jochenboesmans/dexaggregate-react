import React, {Component} from "react";
import _ from "lodash";
import {connect} from "react-redux";

import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Typography from "@material-ui/core/Typography/Typography";

import {formatTime, formatVolume} from "../../util/formatFunctions";
import {rebaseCombinedVolume} from "../../util/marketFunctions";


class MarketInformation extends Component {
	render() {
		const market = this.props.market;
		const combinedVolume = formatVolume(_.sumBy(market.market, p => rebaseCombinedVolume(market.market, p.base_symbol, p.quote_symbol, "DAI")));
		const exchangeNames = _.map(market.exchanges, exchange => exchange.name).join(", ");
		const marketSize = market.market ? market.market.length : 0;
		const marketTime = formatTime(market.timestamp);
		const rows = [
			{
				tooltip: `The sum of volumes of all market pairs across all exchanges. All volumes are denominated in DAI for readability and ease of interpretation.`,
				textLeft: `Combined Volume (24h) [DAI]`,
				textRight: combinedVolume
			},
			{
				tooltip: `A list of all exchanges from which market data is included.`,
				textLeft: `Exchanges`,
				textRight: exchangeNames
			},
			{
				tooltip: `The total amount of market pairs being listed.`,
				textLeft: `Pairs`,
				textRight: marketSize
			},
			{
				tooltip: `The date on which the market currently being displayed was last updated.`,
				textLeft: `Last Update`,
				textRight: marketTime
			}
		];

		return (
			<Table>
				<TableBody>
					{_.map(rows, row => (
						<TableRow key={row.textLeft}>
							<TableCell>
								<Tooltip title={row.tooltip} placement="bottom">
									<Typography style={{fontWeight: "bold"}}>{row.textLeft}</Typography>
								</Tooltip>
							</TableCell>
							<TableCell numeric>
								<Typography>{row.textRight}</Typography>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	}
}

export default connect(({market}) => ({market}))(MarketInformation);