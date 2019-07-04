import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatPrice} from "../../../../../util/format";

interface PropsType {currency: any}
const CurrenciesTableRegularCurrencyLastPrice: FC<PropsType> = ({currency}) => (
	<TableCell align="right">
		<Typography>
			{formatPrice(currency.lastPrice)}
		</Typography>
	</TableCell>
);

export default CurrenciesTableRegularCurrencyLastPrice;