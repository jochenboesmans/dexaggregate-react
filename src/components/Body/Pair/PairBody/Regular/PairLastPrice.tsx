import React, { FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";

interface PropsType {
	emd: any
}

const PairLastPrice: FC<PropsType> = ({ emd }) => {
	const lastPrice = formatPrice(emd.lastPrice);
	return (
		<TableCell align="right">
			<Typography>
				{lastPrice}
			</Typography>
		</TableCell>
	);
};

export default PairLastPrice;