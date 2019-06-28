import React, { FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPercentage, formatPrice } from "../../../../../util/format";

interface PropsType {
	emd: any,
	mostCompetitivePrices: any,
}

const PairSpread: FC<PropsType> = ({ emd, mostCompetitivePrices }) => {
	const { lowAsk, highBid } = mostCompetitivePrices;
	const { currentBid: innerBid, currentAsk: innerAsk } = emd;

	const style = (() => {
		if (innerAsk === lowAsk && innerBid === highBid) {
			return { fontStyle: `italic`, color: `green` };
		} else if (innerAsk === lowAsk) {
			return { color: `green` };
		} else if (innerBid === highBid) {
			return { color: `red` };
		} else {
			return { };
		}
	})();

	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)} (${formatPercentage(spreadRatioDifference)})`;

	return (
		<TableCell align="right">
			<Typography style={style}>
				{spreadString}
			</Typography>
		</TableCell>
	);
};

export default PairSpread;