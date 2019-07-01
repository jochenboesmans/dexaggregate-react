import React, { FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPercentage, formatPrice } from "../../../../../util/format";
import { Pair } from "../../../../../types/market";
import { innerBid, innerAsk } from "../../../../../util/aggregate";

interface PropsType { p: Pair }

const RegularMarketPairSpread: FC<PropsType> = ({ p }) => {
	const ib: number = innerBid(p);
	const ia: number = innerAsk(p);
	const spreadRatioDifference = ((ia / ib) - 1) || 0;
	const arbitrageLimit = -0.01;

	const style = spreadRatioDifference <= arbitrageLimit ? { color: "red" } : {};
	const spreadString = `${formatPrice(ib)} - ${formatPrice(ia)} (${formatPercentage(spreadRatioDifference)})`;
	return (
		<TableCell align="right">
			<Typography style={style}>
				{spreadString}
			</Typography>
		</TableCell>
	);
};

export default RegularMarketPairSpread;