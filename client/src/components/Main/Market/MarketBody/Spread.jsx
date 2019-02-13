import _ from "lodash";
import React from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatPercentage, formatPrice } from "../../../../util/formatFunctions";

const Spread = ({ market, p }) => {
	const innerBid = _.maxBy(p.market_data, emd => emd.current_bid_dai).current_bid_dai;
	const innerAsk = _.minBy(p.market_data, emd => emd.current_ask_dai).current_ask_dai;
	const fInnerBid = formatPrice(innerBid);
	const fInnerAsk = formatPrice(innerAsk);
	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
	const fSpreadPercentage = formatPercentage(spreadRatioDifference);

	const arbitrageLimit = -0.01;
	if (spreadRatioDifference <= arbitrageLimit) {
		return <TableCell style={{color: "red"}} align="right">{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
	} else {
		return <TableCell align="right">{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
	}
};

export { Spread };