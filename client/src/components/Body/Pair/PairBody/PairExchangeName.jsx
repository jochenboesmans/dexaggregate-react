import React from "react";
import { connect } from "react-redux";
import { find } from "lodash/core";

import TableCell from "@material-ui/core/TableCell/TableCell";

const unconnectedPairExchangeName = ({ emd, market }) => {
	const exchangeName = find(market.exchanges, e => e.ID === emd.exchangeID).name;
	return (
		<TableCell>
			{exchangeName}
		</TableCell>
	)
};

const PairExchangeName = connect(({ market }) => ({ market }), null)(unconnectedPairExchangeName);
export default PairExchangeName;