import React, { lazy } from "react";

import { formatPrice } from "../../../../util/formatFunctions";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

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

const unconnectedMobilePairSpread = ({ emd, mostCompetitivePrices }) => {
	const { lowAsk, highBid } = mostCompetitivePrices;

	const innerBid = emd.b;
	const innerAsk = emd.a;

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