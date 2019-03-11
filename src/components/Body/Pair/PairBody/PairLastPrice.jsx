import React from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../util/format";

const PairLastPrice = ({ emd }) => {
	const lastPrice = formatPrice(emd.l);
	return (
		<TableCell align="right">
			<Typography>
				{lastPrice}
			</Typography>
		</TableCell>
	);
};

export default PairLastPrice;