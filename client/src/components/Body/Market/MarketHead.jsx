import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import reduce from "lodash/reduce";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));
const TableHead = lazy(() => import("@material-ui/core/TableHead/TableHead"));
const TableRow = lazy(() => import("@material-ui/core/TableRow/TableRow"));
const Tooltip = lazy(() => import("@material-ui/core/Tooltip/Tooltip"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const unconnectedMarketHead = ({ viewport }) => {
	const columns = [{
		tooltip: `A market pair is defined by a base token and quote token. A ratio between a base token and quote token indicates how much of the quote token is needed to purchase one unit of the base token. These rates are rebased to DAI on ΣDEX for ease of interpretation. `,
		text: `Base/Quote`,
		align: `left`,
	}, {
		tooltip: `The difference between the highest current bid ratio and the lowest current ask ratio across all exchanges for the given market pair. Negative values (where the lowest current ask is lower than the highest current bid) indicate potential arbitrage opportunities between exchanges. Substantial arbitrage opportunities are highlighted in red.`,
		text: `Spread [DAI]`,
		align: `right`,
	}, {
		tooltip: `A volume-weighted sum of all exchanges' last traded ratios for the given market pair.`,
		text: `Last Price [DAI]`,
		align: `right`,
	}, {
		tooltip: `A sum of all exchanges' past 24 hour volumes for the given market pair.`,
		text: `Volume (24h) [DAI]`,
		align: `right`,
	}];

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const vw = viewport.width || initialVW;

	const columnAmount = (vw < 760) ? 2 : 4;

	return (
		<TableHead>
			<TableRow style={{ height: "4vh" }}>
				{reduce(columns, (result, column, i) => {
					if (i < columnAmount) {
						result.push(
							<TableCell align={column.align} key={column.text}>
								<Tooltip title={column.tooltip} placement="bottom">
									<Suspense fallback={<div>Loading...</div>}>
										<Typography style={{color: "black", fontWeight: "bold"}}>{column.text}</Typography>
									</Suspense>
								</Tooltip>
							</TableCell>
						)
					}
					return result;
				}, [])}
			</TableRow>
		</TableHead>
	);
};

const MarketHead = connect(({ viewport }) => ({ viewport }), null)(unconnectedMarketHead);
export default MarketHead;