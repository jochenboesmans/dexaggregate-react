import _ from "lodash";
import React from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatPercentage, formatPrice } from "../../../../util/formatFunctions";

const Spread = ({ p }) => {
	const innerBid = _.reduce(p.market_data, (max, emd) => {
		return (emd.current_bid_dai > max) ?  emd.current_bid_dai : max
	}, 0);
	const innerAsk = _.reduce(p.market_data, (min, emd) => {
		return (emd.current_ask_dai < min) ? emd.current_ask_dai : min
	}, Number.MAX_VALUE);
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