import React from "react";
import { object } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";

const PairLastPrice = ({ emd }) => {
	const lastPrice = formatPrice(emd.lastPrice);
	return (
		<TableCell align="right">
			<Typography>
				{lastPrice}
			</Typography>
		</TableCell>
	);
};

PairLastPrice.propTypes = {
	emd: object.isRequired,
};

export default PairLastPrice;