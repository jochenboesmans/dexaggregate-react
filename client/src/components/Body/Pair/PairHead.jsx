import React from "react";
import { connect } from "react-redux";
import _ from "lodash/core";

import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";

const unconnectedPairHead = ({ p, viewport }) => {
	const columns = [{
		tooltip: `An exchange on which ${p.base_symbol}/${p.quote_symbol} is currently trading.`,
		text: `Exchange`,
		align: `left`,
	}, {
		tooltip: `The difference between the highest current bid ratio and the lowest current ask ratio for ${p.base_symbol}/${p.quote_symbol}. The exchange with the most competitive price for buying/selling ${p.quote_symbol} for ${p.base_symbol} is highlighted in green/red respectively. Italic, green text indicates this exchange offers the most competitive prices for both buying and selling ${p.quote_symbol} for ${p.base_symbol}.`,
		text: `Spread [DAI]`,
		align: `right`,
	}, {
		tooltip: `The last price for which ${p.quote_symbol} traded for ${p.base_symbol} on a given exchange.`,
		text: `Last Price [DAI]`,
		align: `right`,
	}, {
		tooltip: `The 24-hour volume for ${p.base_symbol}/${p.quote_symbol} on a given exchange.`,
		text: `Volume (24h) [DAI]`,
		align: `right`,
	}];

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const vw = viewport.width || initialVW;

	const columnAmount = (vw < 760) ? 2 : 4;

	return (
		<TableHead>
			<TableRow style={{ height: "4vh"}}>
				{_.reduce(columns, (result, column, i) => {
					if (i < columnAmount) {
						result.push(
							<TableCell align={column.align} key={column.text}>
								<Tooltip title={column.tooltip} placement="bottom">
									<Typography style={{color: "black", fontWeight: "bold"}}>{column.text}</Typography>
								</Tooltip>
							</TableCell>
						)
					}
					return result;
				}, [])}
			</TableRow>
		</TableHead>
	)
};

const PairHead = connect(({ viewport }) => ({ viewport }), null)(unconnectedPairHead);
export { PairHead };