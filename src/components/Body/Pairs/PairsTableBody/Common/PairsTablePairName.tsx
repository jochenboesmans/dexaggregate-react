import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {Pair}  from "../../../../../types/market";

interface PropsType {pair: Pair}
const PairsTablePairName: FC<PropsType> = ({pair}) => (
	<TableCell>
		<Typography>
			{`${pair.baseSymbol}/${pair.quoteSymbol}`}
		</Typography>
	</TableCell>
);

export default PairsTablePairName;