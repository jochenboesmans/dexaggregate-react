import React, { lazy } from "react";
//import { connect } from "react-redux";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

const unconnectedMarketPairName = ({ p }) => {
	const pairName = `${p.base_symbol}/${p.quote_symbol}`;
	return (
		<TableCell>
			{pairName}
		</TableCell>
	)
};

//const MarketPairName = connect(null, null)(unconnectedMarketPairName);
export default unconnectedMarketPairName;