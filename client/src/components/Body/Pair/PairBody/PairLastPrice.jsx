import React from "react";
import { connect } from "react-redux";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatPrice } from "../../../../util/formatFunctions";

const unconnectedPairLastPrice = ({ emd }) => {
	const lastTraded = emd.last_traded_dai;
	return (
		<TableCell align="right">
			{formatPrice(lastTraded)}
		</TableCell>
	)
};

const PairLastPrice = connect(null, null)(unconnectedPairLastPrice);
export { PairLastPrice };