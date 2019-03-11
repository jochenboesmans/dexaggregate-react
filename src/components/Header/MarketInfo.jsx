import React, { useContext } from "react";
import reduce from "lodash/reduce";

import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Table from "@material-ui/core/Table/Table";

import {
	MarketStateContext,
	TimeStateContext,
	ViewportStateContext,
} from "../../state/contexts/contexts";

import { formatVolume } from "../../util/format";

const MarketInfo = () => {
	const market = useContext(MarketStateContext);
	const time = useContext(TimeStateContext);
	const { height: vh } = useContext(ViewportStateContext);

	if (!market) return <div>Loading...</div>;

	const combinedVolume = formatVolume(reduce(market.market, (totalSum, p) =>
		totalSum + reduce(p.m, (sum, emd) => sum + emd.v, 0), 0));
	const exchangeCount = Object.keys(market.exchanges).length;
	const exchangeNames = Object.values(market.exchanges).map(exchange => exchange.name).join(`, `);
	const marketSize = market.market.length;
	const secondsSinceUpdate = Math.round((time - market.lastUpdate.timestamp) / 1000);
	const latestUpdateExchange = market.exchanges[market.lastUpdate.exchangeID].name;
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

	const colGroup = (vh < 900) ? (
		<colgroup>
			<col style={{ width: `45%` }}/>
			<col style={{ width: `55%` }}/>
		</colgroup>
	) : (
		<colgroup>
			<col style={{ width: `50%` }}/>
			<col style={{ width: `50%` }}/>
		</colgroup>
	);

	const rowsToInclude = (vh < 900) ? [3] : [0, 1, 2, 3];
	const slicedRows = rows.slice(rowsToInclude[0], rowsToInclude[rowsToInclude.length - 1] + 1);

	return (
		<Table
			padding="dense"
			style={{ tableLayout: `fixed` }}
		>
			{colGroup}
			<TableBody>
				{slicedRows.map((r) => {
					const rightElement = (r.tooltipRight) ? (
						<Tooltip title={r.tooltipRight} placement="bottom">
							<Typography variant="caption">{r.textRight}</Typography>
						</Tooltip>) : <Typography variant="caption">{r.textRight}</Typography>;

					return (
						<TableRow style={{ height: `4vh` }} key={r.tooltipLeft}>
							<TableCell align="right">
								<Tooltip title={r.tooltipLeft} placement="bottom">
									<Typography
										variant="caption"
										style={{ fontWeight: `bold` }}
									>
										{r.textLeft}
									</Typography>
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
	);
};

//const TopBar = connect(({ market, time, viewport }) => ({ market, time, viewport }))(unconnectedTopBar);
export default MarketInfo;