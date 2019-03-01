import React, { lazy } from "react";
//import { connect } from "react-redux";
import reduce from "lodash/reduce";

import { formatPrice } from "../../../../util/formatFunctions";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

const unconnectedMobileMarketPairSpread = ({ p }) => {
	const innerBid = reduce(p.market_data, (max, emd) => emd.current_bid_dai > max ?  emd.current_bid_dai : max, 0);
	const innerAsk = reduce(p.market_data, (min, emd) => emd.current_ask_dai < min ? emd.current_ask_dai : min, Number.MAX_VALUE);
	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
	const arbitrageLimit = -0.01;

	const colorString = spreadRatioDifference <= arbitrageLimit ? "red" : "black";
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)}`;
	return (
		<TableCell
			style={{ color: colorString }}
			align="right"
		>
			{spreadString}
		</TableCell>
	)
};

//const MobileMarketPairSpread = connect(null, null)(unconnectedMobileMarketPairSpread);
export default unconnectedMobileMarketPairSpread;