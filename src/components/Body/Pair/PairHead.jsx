import React, { useContext } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";

import { ViewportStateContext } from "../../../state/contexts/contexts";

const PairHead = ({ p }) => {
	const columns = [{
		tooltip: `An exchange on which ${p.b}/${p.q} is currently trading.`,
		text: `Exchange`,
		align: `left`,
	}, {
		tooltip: `The difference between the highest current bid ratio and the lowest current ask ratio for ${p.b}/${p.q}. The exchange with the most competitive price for buying/selling ${p.q} for ${p.b} is highlighted in green/red respectively. Italic, green text indicates this exchange offers the most competitive prices for both buying and selling ${p.q} for ${p.b}.`,
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

	const { width: vw } = useContext(ViewportStateContext);

	const columnAmount = (vw < 760) ? 2 : 4;
	const slicedColumns = columns.slice(0, columnAmount);

	return (
		<TableHead>
			<TableRow style={{ height: `4vh`}}>
				{slicedColumns.map(column => (
					<TableCell align={column.align} key={column.text}>
						<Tooltip title={column.tooltip} placement="bottom">
							<Typography style={{ fontWeight: `bold` }}>{column.text}</Typography>
						</Tooltip>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default PairHead;