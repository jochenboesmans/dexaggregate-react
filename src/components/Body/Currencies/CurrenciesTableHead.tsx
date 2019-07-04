import React, { useContext, FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Typography from "@material-ui/core/Typography/Typography";

import { ViewportStateContext } from "../../../state/contexts/contexts";

interface columnType {
	text: string,
	align: "inherit" | "left" | "center" | "right" | "justify",
	key: string,
}
interface columnsType {
	TOKEN: columnType,
	SPREAD: columnType,
	LAST_PRICE: columnType,
	VOLUME: columnType,
}

const CurrenciesTableHead: FC = () => {
	const { width: vw } = useContext(ViewportStateContext);

	const columns: columnsType = {
		TOKEN: {
			text: "Token",
			align: "left",
			key: "TOKEN",
		},
		SPREAD: {
			text: "Spread [DAI]",
			align: "right",
			key: "SPREAD",
		},
		LAST_PRICE: {
			text: "Last Price [DAI]",
			align: "right",
			key: "LAST_PRICE",
		},
		VOLUME: {
			text: "Volume (24h) [DAI]",
			align: "right",
			key: "VOLUME",
		},
	};

	const selectedColumns = (vw < 760) ? [columns.TOKEN, columns.SPREAD] :
		[columns.TOKEN, columns.SPREAD, columns.LAST_PRICE, columns.VOLUME];

	return (
		<TableHead>
			<TableRow style={{ height: "4vh" }}>
				{selectedColumns.map(column => (
					<TableCell align={column.align} key={column.key} variant="head">
						<Typography style={{fontWeight: "bold"}}>{column.text}</Typography>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default CurrenciesTableHead;