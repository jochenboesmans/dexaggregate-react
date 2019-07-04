import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatPrice} from "../../../../../util/format";
import {Pair} from "../../../../../types/market";
import {lastPrice} from "../../../../../util/aggregate";

interface PropsType {pair: Pair}
const PairsTableRegularPairLastPrice: FC<PropsType> = ({pair}) => (
	<TableCell align="right">
		<Typography>
			{formatPrice(lastPrice(pair))}
		</Typography>
	</TableCell>
);

export default PairsTableRegularPairLastPrice;