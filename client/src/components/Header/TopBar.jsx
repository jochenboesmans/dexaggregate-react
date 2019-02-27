import React from "react";
import { connect } from "react-redux";
import _ from "lodash/core";

import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";

import { formatVolume } from "../../util/formatFunctions";

const unconnectedTopBar = ({ market, time, viewport }) => {
	if (!market.market) return <div>Loading...</div>;

	const combinedVolume = formatVolume(_.reduce(market.market, (totalSum, p) => totalSum + _.reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0), 0));
	const exchangeCount = market.exchanges.length;
	const exchangeNames = _.map(market.exchanges, exchange => exchange.name).join(", ");
	const marketSize = Object.keys(market.market).length;
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
		textLeft: `Latest Update`,
		textRight: `${latestUpdateExchange}, ${secondsSinceUpdate} seconds ago`
	},];

	const vh = viewport.height || Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	const colGroup = (vh < 900) ? (
		<colgroup>
			<col style={{ width: "45%" }}/>
			<col style={{ width: "55%" }}/>
		</colgroup>
	) : (
		<colgroup>
			<col style={{ width: "50%" }}/>
			<col style={{ width: "50%" }}/>
		</colgroup>
	);

	const rowsToInclude = (vh < 900) ? [3] : [0, 1, 2, 3];

	return (
		<Table
			padding="dense"
			style={{ tableLayout: "fixed" }}
		>
			{colGroup}
			<TableBody>
				{_.map(rowsToInclude, (ri) => {
					const rightElement = (rows[ri].tooltipRight) ? (
						<Tooltip title={rows[ri].tooltipRight} placement="bottom">
							<Typography variant="caption">{rows[ri].textRight}</Typography>
						</Tooltip>) : <Typography variant="caption">{rows[ri].textRight}</Typography>;

					return (
						<TableRow style={{ height: "4vh" }} key={rows[ri].tooltipLeft}>
							<TableCell align="right">
								<Tooltip title={rows[ri].tooltipLeft} placement="bottom">
									<Typography variant="caption" style={{ fontWeight: "bold" }}>{rows[ri].textLeft}</Typography>
								</Tooltip>
							</TableCell>
							<TableCell>
								{rightElement}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	)
};

const TopBar = connect(({ market, time, viewport }) => ({ market, time, viewport }))(unconnectedTopBar);

export { TopBar };