import React, {Component} from "react";
import _ from "lodash";
import {connect} from "react-redux";

import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid"

import {formatTime, formatVolume} from "../util/formatFunctions";
import {rebaseCombinedVolume} from "../util/marketFunctions";


class TopBar extends Component {
	render() {
		const market = this.props.market;
		const combinedVolume = formatVolume(_.sumBy(market.market, p => rebaseCombinedVolume(market.market, p.base_symbol, p.quote_symbol, "DAI")));
		const exchangeNames = _.map(market.exchanges, exchange => exchange.name).join(", ");
		const marketSize = market.market ? market.market.length : 0;
		const marketTime = formatTime(market.timestamp);
		const rows = [
			{
				tooltip: `A list of all exchanges from which market data is included.`,
				textLeft: `Exchanges`,
				textRight: exchangeNames
			},
			{
				tooltip: `The sum of volumes of all market pairs across all exchanges. All volumes are denominated in DAI for readability and ease of interpretation.`,
				textLeft: `Combined Volume (24h) [DAI]`,
				textRight: combinedVolume
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
			<Grid container
				  direction="row"
				  justify="space-between"
				  spacing={8}
			>
				{_.map(rows, row => (
					<Grid item>
						<Grid container
							  direction="row"
							  alignContent="stretch"
							  justify="stretch"
						>
							<Grid item>
								<Tooltip title={row.tooltip} placement="bottom">
									<Typography variant="caption" style={{fontWeight: "bold"}}>{row.textLeft + ": "}</Typography>
								</Tooltip>
							</Grid>
							<Grid item>
								<Typography variant="caption">{row.textRight}</Typography>
							</Grid>
						</Grid>
					</Grid>
				))}
			</Grid>
		);
	}
}

export default connect(({market}) => ({market}))(TopBar);