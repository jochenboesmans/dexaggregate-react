import React from "react";
import { connect } from "react-redux";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatPercentage, formatPrice } from "../../../../util/formatFunctions";

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

const unconnectedPairSpread = ({ emd, lowAsk, highBid }) => {
	const innerBid = emd.current_bid_dai;
	const innerAsk = emd.current_ask_dai;

	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;

	const style = determineStyle(innerAsk, innerBid, lowAsk, highBid);
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)} (${formatPercentage(spreadRatioDifference)})`;

	return (
		<TableCell
			style={style}
			align="right"
		>
			{spreadString}
		</TableCell>
	);
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

const PairSpread = connect(null, null)(unconnectedPairSpread);
const MobilePairSpread = connect(null, null)(unconnectedMobilePairSpread);

export { PairSpread, MobilePairSpread };