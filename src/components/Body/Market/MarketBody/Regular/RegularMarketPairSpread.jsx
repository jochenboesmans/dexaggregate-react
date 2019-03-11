import React from "react";
import { object } from "prop-types";
import reduce from "lodash/reduce";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPercentage, formatPrice } from "../../../../../util/format";

const RegularMarketPairSpread = ({ p }) => {
	const innerBid = reduce(p.m, (max, emd) => emd.b > max ?  emd.b : max, 0);
	const innerAsk = reduce(p.m, (min, emd) => emd.a < min ? emd.a : min, Number.MAX_VALUE);
	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
	const arbitrageLimit = -0.01;

	const style = spreadRatioDifference <= arbitrageLimit ? { color: `red` } : {};
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)} (${formatPercentage(spreadRatioDifference)})`;
	return (
		<TableCell align="right">
			<Typography style={style}>
				{spreadString}
			</Typography>
		</TableCell>
	);
};

RegularMarketPairSpread.propTypes = {
	p: object.isRequired,
};

export default RegularMarketPairSpread;