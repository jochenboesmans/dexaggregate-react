import React, { lazy } from "react";
//import { connect } from "react-redux";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

const unconnectedPairExchangeName = ({ exchangeName }) => {
	return (
		<TableCell>
			{exchangeName}
		</TableCell>
	)
};

//const PairExchangeName = connect(({ market }) => ({ market }), null)(unconnectedPairExchangeName);
export default unconnectedPairExchangeName;