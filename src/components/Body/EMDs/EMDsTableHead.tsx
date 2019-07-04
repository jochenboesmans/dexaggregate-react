import React, {useContext, FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import Typography from "@material-ui/core/Typography/Typography";

import {ViewportStateContext} from "../../../state/contexts/contexts";

interface columnType {
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

const EMDsTableHead: FC = () => {
	const { width: vw } = useContext(ViewportStateContext);

	const columns: columnsType = {
		EXCHANGE: {
			text: "Exchange",
			align: "left",
			key: "EXCHANGE"
		},
		SPREAD: {
			text: "Spread",
			align: "right",
			key: "SPREAD"
		},
		LAST_PRICE: {
			text: "Last Price",
			align: "right",
			key: "LAST_PRICE"
		},
		VOLUME: {
			text: "Volume (24h)",
			align: "right",
			key: "VOLUME"
		},
	};

	const selectedColumns = (vw < 760) ? [columns.EXCHANGE, columns.SPREAD] :
		[columns.EXCHANGE, columns.SPREAD, columns.LAST_PRICE, columns.VOLUME];

	return (
		<TableHead>
			<TableRow style={{height: "4vh"}}>
				{selectedColumns.map(column => (
					<TableCell align={column.align} key={column.key} variant="head">
						<Typography style={{fontWeight: "bold"}}>{column.text}</Typography>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default EMDsTableHead;