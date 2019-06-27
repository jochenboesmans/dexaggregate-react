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

	if (!market) return <div>Loading MarketInfo...</div>;

	const combinedVolume = formatVolume(reduce(market.market, (totalSum, p) =>
		totalSum + reduce(p.marketData, (sum, emd) => sum + emd.baseVolume, 0), 0));
	const exchangeCount = market.exchanges.length;
	/*const exchangeNames = Object.values(market.exchanges).map(exchange => exchange.name).join(`, `);*/
	const marketSize = market.market.length;
	const secondsSinceUpdate = market.lastUpdate ? Math.floor((time - market.lastUpdate.timestamp) / 1000) : `N/A`;
	const latestUpdatePair = market.lastUpdate ? `${market.lastUpdate.pair.baseSymbol}/${market.lastUpdate.pair.quoteSymbol}` : `N/A`;

	const rows = {
		EXCHANGES: {
			tooltipLeft: `A list of all exchanges from which market data is included.`,
			textLeft: `Exchanges`,
			textRight: exchangeCount,
			//tooltipRight: exchangeNames,
		},
		COMBINED_VOLUME: {
			tooltipLeft: `The sum of volumes of all market pairs across all exchanges.`,
			textLeft: `Combined Volume (24h) [DAI]`,
			textRight: combinedVolume,
		},
		PAIRS: {
			tooltipLeft: `The total amount of market pairs being listed.`,
			textLeft: `Pairs`,
			textRight: marketSize
		},
		LATEST_UPDATE: {
			tooltipLeft: `The pair that last got updated and the time since the last update to the market data.`,
			textLeft: `Latest Update`,
			textRight: `${latestUpdatePair}, ${secondsSinceUpdate} seconds ago`
		},
	};

	const colWidths = [`47.5%`, `5%`, `47.5%`];
	const colGroup = (
		<colgroup>
			{colWidths.map((cw, i) => <col key={i} style={{ width: cw }}/>)}
		</colgroup>
	);

	const rowsToInclude = (vh < 900) ? [rows.LATEST_UPDATE] : Object.values(rows);

	return (
		<Table
			padding="checkbox"
			style={{ tableLayout: `fixed` }}
		>
			{colGroup}
			<TableBody>
				{rowsToInclude.map((r) => {
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
							</TableCell>
							<TableCell align="left">
								{rightElement}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};

export default MarketInfo;