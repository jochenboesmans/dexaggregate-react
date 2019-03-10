import React, { lazy } from "react";

import { formatPrice } from "../../../../util/format";

const TableCell = lazy(() => import(`@material-ui/core/TableCell/TableCell`));
const Typography = lazy(() => import(`@material-ui/core/Typography/Typography`));

const MobilePairSpread = ({ emd, mostCompetitivePrices }) => {
	const { lowAsk, highBid } = mostCompetitivePrices;
	const { b: innerBid, a: innerAsk } = emd;

	const style = (() => {
		if (innerAsk === lowAsk && innerBid === highBid) {
			return { fontStyle: `italic`, color: `green` };
		} else if (innerAsk === lowAsk) {
			return { color: `green` };
		} else if (innerBid === highBid) {
			return { color: `red` };
		} else {
			return { };
		}
	})();

	const spreadString = `${formatPrice(innerBid)} - ${formatPrice(innerAsk)}`;

	return (
		<TableCell align="right">
			<Typography style={style}>
				{spreadString}
			</Typography>
		</TableCell>
	);
};

export default MobilePairSpread;