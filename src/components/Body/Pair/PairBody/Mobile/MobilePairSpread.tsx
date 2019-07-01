import React, { FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";
import { ExchangeMarketData } from "../../../../../types/market";

interface PropsType {
	emd: ExchangeMarketData,
	mostCompetitivePrices: {
		lowAsk: number,
		highBid: number
	},
}
const MobilePairSpread: FC<PropsType> = ({ emd, mostCompetitivePrices }) => {
	const { lowAsk, highBid } = mostCompetitivePrices;
	const { currentBid: innerBid, currentAsk: innerAsk } = emd;

	const style = (() => {
		if (innerAsk === lowAsk && innerBid === highBid) {
			return { fontStyle: "italic", color: "green" };
		} else if (innerAsk === lowAsk) {
			return { color: "green" };
		} else if (innerBid === highBid) {
			return { color: "red" };
		} else {
			return { };
		}
	})();

	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)}`;

	return (
		<TableCell align="right">
			<Typography style={style}>
				{spreadString}
			</Typography>
		</TableCell>
	);
};

export default MobilePairSpread;