import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";


const unconnectedPairHead = ({ p, viewport }) => {
	const columns = [{
		tooltip: `An exchange on which ${p.base_symbol}/${p.quote_symbol} is currently trading.`, text: `Exchange`
	}, {
		tooltip: `The difference between the highest current bid ratio and the lowest current ask ratio for ${p.base_symbol}/${p.quote_symbol}. The exchange with the most competitive price for buying/selling ${p.quote_symbol} for ${p.base_symbol} is highlighted in green/red respectively. Italic, green text indicates this exchange offers the most competitive prices for both buying and selling ${p.quote_symbol} for ${p.base_symbol}. All ratios are denominated in DAI for readability and ease of interpretation.`,
		text: `Current Spread [DAI]`
	}, {
		tooltip: `The last price for which ${p.quote_symbol} traded for ${p.base_symbol} on a given exchange. All ratios are denominated in DAI for readability and ease of interpretation.`,
		text: `Last Price [DAI]`
	}, {
		tooltip: `The 24-hour volume for ${p.base_symbol}/${p.quote_symbol} on a given exchange. All volumes are denominated in DAI for readability and ease of interpretation.`,
		text: `Volume (24h) [DAI]`
	}];

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const initialVH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	const vw = viewport.width || initialVW;
	const vh = viewport.height || initialVH;

	if (vw < 760) {
		return (
			<TableHead>
				<TableRow style={{ height: "4vh"}}>
					<TableCell>
						<Tooltip title={columns[0].tooltip} placement="bottom">
							<Typography style={{color: "black", fontWeight: "bold"}}>{columns[0].text}</Typography>
						</Tooltip>
					</TableCell>
					<TableCell align="right">
						<Tooltip title={columns[1].tooltip} placement="bottom">
							<Typography style={{color: "black", fontWeight: "bold"}}>Spread [DAI]</Typography>
						</Tooltip>
					</TableCell>
				</TableRow>
			</TableHead>
		)
	} else {
		return (
			<TableHead>
				<TableRow style={{ height: "4vh"}}>
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
								<TableCell align="right" key={column.text}>
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
	}
};

const PairHead = connect(({ viewport }) => ({ viewport }), null)(unconnectedPairHead);
export { PairHead };