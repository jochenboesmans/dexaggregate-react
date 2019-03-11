import React from "react";
import { object } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";

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

MobilePairSpread.propTypes = {
	emd: object.isRequired,
	mostCompetitivePrices: object.isRequired,
};

export default MobilePairSpread;