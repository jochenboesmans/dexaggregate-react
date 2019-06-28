import React, { useContext, FC } from "react";
import { object } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Typography from "@material-ui/core/Typography/Typography";

import { ViewportStateContext } from "../../../state/contexts/contexts";

interface PropsType {
	p: any
}

interface columnType {
	tooltip: string,
	text: string,
	align: "inherit" | "left" | "center" | "right" | "justify",
	key: string,
}
interface columnsType {
	EXCHANGE: columnType,
	SPREAD: columnType,
	LAST_PRICE: columnType,
	VOLUME: columnType,
}

const PairHead: FC<PropsType> = ({ p }) => {
	const { width: vw } = useContext(ViewportStateContext);

	const columns: columnsType = {
		EXCHANGE: {
			tooltip: `An exchange on which ${p.baseSymbol}/${p.quoteSymbol} is currently trading.`,
			text: `Exchange`,
			align: `left`,
			key: `EXCHANGE`,
		},
		SPREAD: {
			tooltip: `The difference between the highest current bid ratio and the lowest current ask ratio for ${p.baseSymbol}/${p.quoteSymbol}. \
			The exchange with the most competitive price for buying/selling ${p.quoteSymbol} for ${p.baseSymbol} is highlighted in green/red respectively. \
			Italic, green text indicates this exchange offers the most competitive prices for both buying and selling ${p.quoteSymbol} for ${p.baseSymbol}.`,
			text: `Spread [DAI]`,
			align: `right`,
			key: `SPREAD`,
		},
		LAST_PRICE: {
			tooltip: `The last price for which ${p.quoteSymbol} traded for ${p.baseSymbol} on a given exchange.`,
			text: `Last Price [DAI]`,
			align: `right`,
			key: `LAST_PRICE`,
		},
		VOLUME: {
			tooltip: `The 24-hour volume for ${p.baseSymbol}/${p.quoteSymbol} on a given exchange.`,
			text: `Volume (24h) [DAI]`,
			align: `right`,
			key: `VOLUME`,
		},
	};

	const selectedColumns = (vw < 760) ? [columns.EXCHANGE, columns.SPREAD] :
		[columns.EXCHANGE, columns.SPREAD, columns.LAST_PRICE, columns.VOLUME];

	return (
		<TableHead>
			<TableRow style={{ height: `4vh`}}>
				{selectedColumns.map(column => (
					<TableCell align={column.align} key={column.key} variant="head">
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