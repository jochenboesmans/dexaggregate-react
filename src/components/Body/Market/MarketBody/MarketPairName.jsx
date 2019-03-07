import React, { lazy } from "react";
//import { connect } from "react-redux";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

const unconnectedMarketPairName = ({ p }) => {
	const pairName = `${p.b}/${p.q}`;
	return (
		<TableCell>
			{pairName}
		</TableCell>
	)
};

//const MarketPairName = connect(null, null)(unconnectedMarketPairName);
export default unconnectedMarketPairName;