import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";

import { formatVolume } from "../../../util/formatFunctions";

const unconnectedTopBar = ({ market, time }) => {
	if (!(market.market)) return <div>Loading...</div>;

	const combinedVolume = formatVolume(_.reduce(market.market, (totalSum, p) => totalSum + _.reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0), 0));
	const exchangeCount = market.exchanges.length;
	const exchangeNames = _.map(market.exchanges, exchange => exchange.name).join(", ");
	const marketSize = market.market ? Object.keys(market.market).length : 0;
	const secondsSinceUpdate = Math.round((time - market.timestamp) / 1000);
	const latestUpdateExchange = _.find(market.exchanges, e => e.ID === market.lastUpdateExchangeID).name;
	const rows = [{
		tooltipLeft: `A list of all exchanges from which market data is included.`,
		textLeft: `Exchanges`,
		textRight: exchangeCount,
		tooltipRight: exchangeNames,
	}, {
		tooltipLeft: `The sum of volumes of all market pairs across all exchanges.`,
		textLeft: `Combined Volume (24h) [DAI]`,
		textRight: combinedVolume,
	}, {
		tooltipLeft: `The total amount of market pairs being listed.`,
		textLeft: `Pairs`,
		textRight: marketSize
	}, {
		tooltipLeft: `The exchange of and the time since the last update to the market data.`,
		textLeft: `Latest Market Update`,
		textRight: `${latestUpdateExchange}, ${secondsSinceUpdate} seconds ago`
	},];

	return (
		<Grid
			container
			direction="row"
		>
			<Grid item style={{ width: "5%"}}>
			</Grid>
			<Grid item style={{ width: "90%" }}>
				<Table
					padding="dense"
					style={{ tableLayout: "fixed" }}
				>
					<colgroup>
						<col style={{ width: "25%" }}/>
						<col style={{ width: "25%" }}/>
					</colgroup>
					{_.map(rows, (row, i) => {
						const rightElement = (row.tooltipRight) ? (
							<Tooltip title={row.tooltipRight} placement="bottom">
								<Typography variant="caption">{row.textRight}</Typography>
							</Tooltip>) : <Typography variant="caption">{row.textRight}</Typography>;
						return (
							<TableRow style={{ height: "4vh" }} key={i}>
								<TableCell align="right">
									<Tooltip title={row.tooltipLeft} placement="bottom">
										<Typography variant="caption" style={{ fontWeight: "bold" }}>{row.textLeft}</Typography>
									</Tooltip>
								</TableCell>
								<TableCell>
									{rightElement}
								</TableCell>
							</TableRow>
						)
					})}
				</Table>
			</Grid>
			<Grid item style={{ width: "5%"}}>
			</Grid>
		</Grid>
	)
};

const TopBar = connect(({ market, time }) => ({ market, time }))(unconnectedTopBar);

export { TopBar };