import React, { FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";
import { ExchangeMarketData } from "../../../../../types/market";

interface PropsType { emd: ExchangeMarketData }

const PairLastPrice: FC<PropsType> = ({ emd }) => {
	const fLastPrice = formatPrice(emd.lastPrice);
	return (
		<TableCell align="right">
			<Typography>
				{fLastPrice}
			</Typography>
		</TableCell>
	);
};

export default PairLastPrice;