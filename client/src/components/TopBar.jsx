import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid/Grid";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";

import { formatVolume } from "../util/formatFunctions";

const unconnectedTopBar = ({ market, time }) => {
	if (!(market.market)) {
		return null;
	}


	const combinedVolume = formatVolume(_.reduce(market.market, (totalSum, p) =>
		totalSum + _.reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0), 0));
	const exchangeNames = _.map(market.exchanges, exchange => exchange.name).join(", ");
	const marketSize = market.market ? Object.keys(market.market).length : 0;
	const secondsSinceUpdate = Math.round((time - market.timestamp) / 1000);
	const rows = [{
		tooltip: `A list of all exchanges from which market data is included.`,
		textLeft: `Exchanges`,
		textRight: exchangeNames
	}, {
		tooltip: `The sum of volumes of all market pairs across all exchanges. All volumes are denominated in DAI for readability and ease of interpretation.`,
		textLeft: `Combined Volume (24h) [DAI]`,
		textRight: combinedVolume
	}, {
		tooltip: `The total amount of market pairs being listed.`, textLeft: `Pairs`, textRight: marketSize
	}, {
		tooltip: `The time, in seconds, since the last update to the market data.`,
		textLeft: `Time Since Last Update`,
		textRight: `${secondsSinceUpdate} seconds`
	}];

	return (
		<Grid container
		      direction="row"
		      justify="space-between"
		      spacing={8}
		>
			{_.map(rows, row => (
				<Grid key={row.tooltip} item>
					<Grid container
					      direction="row"
					      alignContent="stretch"
					      spacing={8}
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
};

const TopBar = connect(({ market, time }) => ({ market, time }))(unconnectedTopBar);

export { TopBar };