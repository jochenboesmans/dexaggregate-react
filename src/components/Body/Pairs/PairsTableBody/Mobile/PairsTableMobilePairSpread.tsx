import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatPrice} from "../../../../../util/format";
import {Pair} from "../../../../../types/market";
import {innerBid, innerAsk} from "../../../../../util/aggregate";

interface PropsType {pair: Pair}
const PairsTableMobilePairSpread: FC<PropsType> = ({pair}) => {
	const ib: number = innerBid(pair);
	const ia: number = innerAsk(pair);
	const spreadRatioDifference = ((ia / ib) - 1) || 0;
	const arbitrageLimit = -0.01;
	const style = spreadRatioDifference <= arbitrageLimit ? { color: "red" } : {};

	return (
		<TableCell align="right">
			<Typography style={style}>
				{`${formatPrice(ib)} - ${formatPrice(ia)}`}
			</Typography>
		</TableCell>
	);
};

export default PairsTableMobilePairSpread;