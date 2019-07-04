import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

interface PropsType {currency: {quoteSymbol: string}}
const CurrenciesTableCurrencyName: FC<PropsType> = ({currency: {quoteSymbol}}) => (
	<TableCell>
		<Typography>
			{quoteSymbol}
		</Typography>
	</TableCell>
);

export default CurrenciesTableCurrencyName;