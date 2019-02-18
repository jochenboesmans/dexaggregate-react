import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatPercentage, formatPrice } from "../../../../util/formatFunctions";

const unconnectedSpread = ({ p, viewport }) => {
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

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const initialVH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	const vw = viewport.width || initialVW;
	const vh = viewport.height || initialVH;

	const arbitrageLimit = -0.01;
	if (vw < 760) {
		if (spreadRatioDifference <= arbitrageLimit) {
			return <TableCell style={{color: "red"}} align="right">{`${fInnerBid} - ${fInnerAsk}`}</TableCell>
		} else {
			return <TableCell align="right">{`${fInnerBid} - ${fInnerAsk}`}</TableCell>
		}
	} else {
		if (spreadRatioDifference <= arbitrageLimit) {
			return <TableCell style={{color: "red"}} align="right">{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
		} else {
			return <TableCell align="right">{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
		}
	}
};

const Spread = connect(({ viewport }) => ({ viewport }), null)(unconnectedSpread);

export { Spread };