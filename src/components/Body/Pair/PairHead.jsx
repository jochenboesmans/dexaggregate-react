import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));
const TableHead = lazy(() => import("@material-ui/core/TableHead/TableHead"));
const TableRow = lazy(() => import("@material-ui/core/TableRow/TableRow"));
const Tooltip = lazy(() => import("@material-ui/core/Tooltip/Tooltip"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const unconnectedPairHead = ({ p, viewport }) => {
	const columns = [{
		tooltip: `An exchange on which ${p.b}/${p.q} is currently trading.`,
		text: `Exchange`,
		align: `left`,
	}, {
		tooltip: `The difference between the highest current bid ratio and the lowest current ask ratio for ${p.base_symbol}/${p.quote_symbol}. The exchange with the most competitive price for buying/selling ${p.quote_symbol} for ${p.base_symbol} is highlighted in green/red respectively. Italic, green text indicates this exchange offers the most competitive prices for both buying and selling ${p.quote_symbol} for ${p.base_symbol}.`,
		text: `Spread [DAI]`,
		align: `right`,
	}, {
		tooltip: `The last price for which ${p.q} traded for ${p.b} on a given exchange.`,
		text: `Last Price [DAI]`,
		align: `right`,
	}, {
		tooltip: `The 24-hour volume for ${p.b}/${p.q} on a given exchange.`,
		text: `Volume (24h) [DAI]`,
		align: `right`,
	}];

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const vw = viewport.width || initialVW;

	const columnAmount = (vw < 760) ? 2 : 4;
	const slicedColumns = columns.slice(0, columnAmount);

	return (
		<TableHead>
			<TableRow style={{ height: "4vh"}}>
				{slicedColumns.map(column => (
					<TableCell align={column.align} key={column.text}>
						<Tooltip title={column.tooltip} placement="bottom">
							<Suspense fallback={<div>Loading...</div>}>
								<Typography style={{fontWeight: "bold"}}>{column.text}</Typography>
							</Suspense>
						</Tooltip>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
};

const PairHead = connect(({ viewport }) => ({ viewport }), null)(unconnectedPairHead);
export default PairHead;