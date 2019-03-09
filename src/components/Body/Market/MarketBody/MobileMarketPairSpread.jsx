import React, { lazy } from "react";
import reduce from "lodash/reduce";

import { formatPrice } from "../../../../util/format";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const MobileMarketPairSpread = ({ p }) => {
	const innerBid = reduce(p.m, (max, emd) => emd.b > max ?  emd.b : max, 0);
	const innerAsk = reduce(p.m, (min, emd) => emd.a < min ? emd.a : min, Number.MAX_VALUE);
	const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
	const arbitrageLimit = -0.01;

	const style = spreadRatioDifference <= arbitrageLimit ? { color: "red" } : {};
	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)}`;
	return (
		<TableCell align="right">
			<Typography style={style}>
				{spreadString}
			</Typography>
		</TableCell>
	)
};

export default MobileMarketPairSpread;