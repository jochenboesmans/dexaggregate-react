import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatPercentage, formatPrice } from "../../../../util/formatFunctions";

const unconnectedMarketPairSpread = ({ p }) => {
	const innerBid = _.reduce(p.market_data, (max, emd) => emd.current_bid_dai > max ?  emd.current_bid_dai : max, 0);
	const innerAsk = _.reduce(p.market_data, (min, emd) => emd.current_ask_dai < min ? emd.current_ask_dai : min, Number.MAX_VALUE);
	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
	const arbitrageLimit = -0.01;

	const colorString = spreadRatioDifference <= arbitrageLimit ? "red" : "black";
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)} (${formatPercentage(spreadRatioDifference)})`;
	return (
		<TableCell
			style={{ color: colorString }}
			align="right"
		>
			{spreadString}
		</TableCell>
	)
};

const unconnectedMobileMarketPairSpread = ({ p }) => {
	const innerBid = _.reduce(p.market_data, (max, emd) => emd.current_bid_dai > max ?  emd.current_bid_dai : max, 0);
	const innerAsk = _.reduce(p.market_data, (min, emd) => emd.current_ask_dai < min ? emd.current_ask_dai : min, Number.MAX_VALUE);
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

const MarketPairSpread = connect(null, null)(unconnectedMarketPairSpread);
const MobileMarketPairSpread = connect(null, null)(unconnectedMobileMarketPairSpread);

export { MarketPairSpread, MobileMarketPairSpread };