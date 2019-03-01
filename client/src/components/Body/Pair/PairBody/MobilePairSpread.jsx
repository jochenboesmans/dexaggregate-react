import React from "react";

import TableCell from "@material-ui/core/TableCell";

import { formatPrice } from "../../../../util/formatFunctions";

const determineStyle = (innerAsk, innerBid, lowAsk, highBid) => {
	if (innerAsk === lowAsk && innerBid === highBid) {
		return { fontStyle: "italic", color: "green" };
	} else if (innerAsk === lowAsk) {
		return { color: "green" };
	} else if (innerBid === highBid) {
		return { color: "red" };
	} else {
		return { };
	}
};

const unconnectedMobilePairSpread = ({ emd, lowAsk, highBid }) => {
	const innerBid = emd.current_bid_dai;
	const innerAsk = emd.current_ask_dai;

	const style = determineStyle(innerAsk, innerBid, lowAsk, highBid);
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)}`;

	return (
		<TableCell
			style={style}
			align="right"
		>
			{spreadString}
		</TableCell>
	);
};

export default unconnectedMobilePairSpread;