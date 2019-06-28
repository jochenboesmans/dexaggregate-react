import React, { FC } from "react";
import reduce from "lodash/reduce";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPercentage, formatPrice } from "../../../../../util/format";

interface PropsType {
	p: any
}

const RegularMarketPairSpread: FC<PropsType> = ({ p }) => {
	const innerBid = reduce(p.marketData, (max, emd) => emd.currentBid > max ?  emd.currentBid : max, 0);
	const innerAsk = reduce(p.marketData, (min, emd) => emd.currentAsk < min ? emd.currentAsk : min, Number.MAX_VALUE);
	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
	const arbitrageLimit = -0.01;

	const style = spreadRatioDifference <= arbitrageLimit ? { color: `red` } : {};
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)} (${formatPercentage(spreadRatioDifference)})`;
	return (
		<TableCell align="right">
			<Typography style={style}>
				{spreadString}
			</Typography>
		</TableCell>
	);
};

export default RegularMarketPairSpread;