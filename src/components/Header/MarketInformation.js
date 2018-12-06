import React, {Component} from "react";
import _ from "lodash";
import {connect} from "react-redux";

import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Tooltip from '@material-ui/core/Tooltip';

import {formatTime, formatVolume} from "../../util/formatFunctions";
import {rebaseCombinedVolume} from "../../util/marketFunctions";
import Typography from "@material-ui/core/es/Typography/Typography";

class MarketInformation extends Component {
	render() {
		const market = this.props.market;
		const combinedVolume = formatVolume(_.sumBy(market.market, p => rebaseCombinedVolume(market.market, p.base_symbol, p.quote_symbol, "DAI")));
		const exchangeNames = _.map(market.exchanges, exchange => exchange.name).join(", ");
		const marketSize = market.market ? market.market.length : 0;
		const marketTime = formatTime(market.timestamp);
		const tt1 = `The sum of volumes of all market pairs across all exchanges. All volumes are denominated in DAI for readability and ease of interpretation.`;
		const tt2 = `A list of all exchanges from which market data is included.`;
		const tt3 = `The total amount of market pairs being listed.`;
		const tt4 = `The date on which the market currently being displayed was last updated.`;
		return (
			<div>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<Tooltip title={tt1} placement="top">
									<Typography style={{fontWeight: "bold"}}>Combined Volume (24h) [DAI]</Typography>
								</Tooltip>
							</TableCell>
							<TableCell numeric>
								<Typography>{combinedVolume}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Tooltip title={tt2} placement="top">
									<Typography style={{fontWeight: "bold"}}>Exchanges</Typography>
								</Tooltip>
							</TableCell>
							<TableCell numeric>
								<Typography>{exchangeNames}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Tooltip title={tt3} placement="top">
									<Typography style={{fontWeight: "bold"}}>Pairs</Typography>
								</Tooltip>
							</TableCell>
							<TableCell numeric>
								<Typography>{marketSize}</Typography>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Tooltip title={tt4} placement="top">
									<Typography style={{fontWeight: "bold"}}>Last Update</Typography>
								</Tooltip>
							</TableCell>
							<TableCell numeric>
								<Typography>{marketTime}</Typography>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		)
	}
}

export default connect(({market}) => ({market}))(MarketInformation);