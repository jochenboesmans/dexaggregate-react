import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatPercentage, formatPrice} from "../../../../../util/format";

interface PropsType {currency: any}
const CurrenciesTableRegularCurrencySpread: FC<PropsType> = ({currency}) => {
	const ib = currency.currentBid;
	const ia = currency.currentAsk;
	const spreadRatioDifference = ((ia / ib) - 1) || 0;
	const arbitrageLimit = -0.01;
	const style = spreadRatioDifference <= arbitrageLimit ? { color: "red" } : {};

	return (
		<TableCell align="right">
			<Typography style={style}>
				{`${formatPrice(ib)} - ${formatPrice(ia)} (${formatPercentage(spreadRatioDifference)})`}
			</Typography>
		</TableCell>
	);
};

export default CurrenciesTableRegularCurrencySpread;