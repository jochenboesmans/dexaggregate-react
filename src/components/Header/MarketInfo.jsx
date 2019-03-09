import React, { lazy, Suspense, useContext } from "react";
import reduce from "lodash/reduce";

import { MarketStateContext } from "../../contexts/contexts";
import { TimeStateContext } from "../../contexts/contexts";
import { ViewportStateContext } from "../../contexts/contexts";

import { formatVolume } from "../../util/format";

const Tooltip = lazy(() => import("@material-ui/core/Tooltip/Tooltip"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));
const TableRow = lazy(() => import("@material-ui/core/TableRow/TableRow"));
const TableBody = lazy(() => import("@material-ui/core/TableBody/TableBody"));
const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));
const Table = lazy(() => import("@material-ui/core/Table/Table"));

const MarketInfo = () => {
	const market = useContext(MarketStateContext);
	const time = useContext(TimeStateContext);
	const { height: vh } = useContext(ViewportStateContext);

	if (!market.market) return <div>Loading...</div>;

	const combinedVolume = formatVolume(reduce(market.market, (totalSum, p) =>
		totalSum + reduce(p.m, (sum, emd) => sum + emd.v, 0), 0));
	const exchangeCount = market.exchanges.length;
	const exchangeNames = market.exchanges.map(exchange => exchange.name).join(", ");
	const marketSize = market.market.length;
	const secondsSinceUpdate = Math.round((time - market.timestamp) / 1000);
	const latestUpdateExchange = market.exchanges.find(e => e.ID === market.lastUpdateExchangeID).name;
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
	const slicedRows = rows.slice(rowsToInclude[0], rowsToInclude[rowsToInclude.length - 1] + 1);

	return (
		<Table
			padding="dense"
			style={{ tableLayout: "fixed" }}
		>
			{colGroup}
			<TableBody>
				{slicedRows.map((r) => {
					const rightElement = (r.tooltipRight) ? (
						<Tooltip title={r.tooltipRight} placement="bottom">
							<Typography variant="caption">{r.textRight}</Typography>
						</Tooltip>) : <Typography variant="caption">{r.textRight}</Typography>;

					return (
						<TableRow style={{ height: "4vh" }} key={r.tooltipLeft}>
							<TableCell align="right">
								<Suspense fallback={<div>Loading...</div>}>
									<Tooltip title={r.tooltipLeft} placement="bottom">
										<Typography
											variant="caption"
											style={{ fontWeight: "bold" }}
										>
											{r.textLeft}
										</Typography>
									</Tooltip>
								</Suspense>
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

//const TopBar = connect(({ market, time, viewport }) => ({ market, time, viewport }))(unconnectedTopBar);
export default MarketInfo;