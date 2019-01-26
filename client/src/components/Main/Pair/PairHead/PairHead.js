import React from "react";
import _ from "lodash";

import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const PairHead = (pair) => {
	const columns = [
		{
			tooltip: `An exchange on which ${pair.base_symbol}/${pair.quote_symbol} is currently trading.`,
			text: `Exchange`
		},
		{
			tooltip: `The difference between the highest current bid ratio and the lowest current ask ratio for ${pair.base_symbol}/${pair.quote_symbol}. The exchange with the most competitive price for buying/selling ${pair.quote_symbol} for ${pair.base_symbol} is highlighted in green/red respectively. Italic, green text indicates this exchange offers the most competitive prices for both buying and selling ${pair.quote_symbol} for ${pair.base_symbol}. All ratios are denominated in DAI for readability and ease of interpretation.`,
			text: `Spread of ${pair.quote_symbol} [DAI]`
		},
		{
			tooltip: `The last price for which ${pair.quote_symbol} traded for ${pair.base_symbol} on a given exchange. All ratios are denominated in DAI for readability and ease of interpretation.`,
			text: `Last Price of ${pair.quote_symbol} [DAI]`
		},
		{
			tooltip: `The 24-hour volume for ${pair.base_symbol}/${pair.quote_symbol} on a given exchange. All volumes are denominated in DAI for readability and ease of interpretation.`,
			text: `Volume (24h) [DAI]`
		}
	];
	return (
		<TableHead>
			<TableRow>
				{_.map(columns, column => {
					if (column.text === `Exchange`) {
						return (
							<TableCell key={column.text}>
								<Tooltip title={column.tooltip} placement="bottom">
									<Typography style={{color: "black", fontWeight: "bold"}}>{column.text}</Typography>
								</Tooltip>
							</TableCell>
						)
					} else {
						return (
							<TableCell numeric key={column.text}>
								<Tooltip title={column.tooltip} placement="bottom">
									<Typography style={{color: "black", fontWeight: "bold"}}>{column.text}</Typography>
								</Tooltip>
							</TableCell>
						)
					}
				})}
			</TableRow>
		</TableHead>
	)
};

export { PairHead };