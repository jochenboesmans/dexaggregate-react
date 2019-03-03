import React, { lazy } from "react";
//import { connect } from "react-redux";

import { formatPrice } from "../../../../util/formatFunctions";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

const unconnectedPairLastPrice = ({ emd }) => {
	const lastTraded = emd.last_traded_dai;
	return (
		<TableCell align="right">
			{formatPrice(lastTraded)}
		</TableCell>
	)
};

//const PairLastPrice = connect(null, null)(unconnectedPairLastPrice);
export default unconnectedPairLastPrice;