import React, { useContext, FC } from "react";
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

const MarketInfo: FC = () => {
	const marketState = useContext(MarketStateContext);
	if (!marketState) return <div>We're trying to fetch the market...</div>;
	const { exchanges, lastUpdate, market } = marketState;
	const time = useContext(TimeStateContext);
	const { height: vh } = useContext(ViewportStateContext);

	const combinedVolume: number = reduce(market, (totalSum, p) =>
		totalSum + reduce(p.marketData, (sum, emd) => sum + emd.baseVolume, 0), 0);
	const fCombinedVolume = formatVolume(combinedVolume);
	const exchangeCount = exchanges.length;
	const exchangeNames: string = exchanges.map(e => e.toUpperCase()).join(`, `);
	const marketSize = market.length;
	const secondsSinceUpdate: string | number = lastUpdate ? Math.floor((time - lastUpdate.timestamp) / 1000) : "N/A";
	const latestUpdatePair: string = lastUpdate ? `${lastUpdate.pair.baseSymbol}/${lastUpdate.pair.quoteSymbol}` : "N/A";

	const rows = {
		EXCHANGES: {
			tooltipLeft: "All exchanges in the market.",
			textLeft: "Exchanges",
			textRight: exchangeCount,
			tooltipRight: exchangeNames,
		},
		COMBINED_VOLUME: {
			tooltipLeft: "The sum of volumes of all market pairs across all exchanges.",
			textLeft: "Combined Volume (24h) [DAI]",
			textRight: fCombinedVolume,
			tooltipRight: null,
		},
		PAIRS: {
			tooltipLeft: "The amount of pairs in the market.",
			textLeft: "Pairs",
			textRight: marketSize,
			tooltipRight: null,
		},
		LATEST_UPDATE: {
			tooltipLeft: `The pair that last got updated and the time since this update.`,
			textLeft: `Latest Update`,
			textRight: `${latestUpdatePair}, ${secondsSinceUpdate} seconds ago`,
			tooltipRight: null,
		},
	};

	const colWidths = ["47.5%", "5%", "47.5%"];
	const colGroup = (
		<colgroup>
			{colWidths.map((cw, i) => <col key={i} style={{ width: cw }}/>)}
		</colgroup>
	);

	const rowsToInclude = (vh < 900) ? [rows.LATEST_UPDATE] : Object.values(rows);

	return (
		<Table
			padding="checkbox"
			style={{ tableLayout: "fixed" }}
		>
			{colGroup}
			<TableBody>
				{rowsToInclude.map((r) => {
					const leftElement = (r.tooltipLeft) ? (
						<Tooltip title={r.tooltipLeft} placement="bottom">
							<Typography style={{ fontWeight: "bold" }}>{r.textLeft}</Typography>
						</Tooltip>) : <Typography>{r.textLeft}</Typography>;

					const rightElement = (r.tooltipRight) ? (
						<Tooltip title={r.tooltipRight} placement="bottom">
							<Typography>{r.textRight}</Typography>
						</Tooltip>) : <Typography>{r.textRight}</Typography>;

					return (
						<TableRow style={{ height: "4vh" }} key={r.tooltipLeft}>
							<TableCell align="right">
								{leftElement}
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