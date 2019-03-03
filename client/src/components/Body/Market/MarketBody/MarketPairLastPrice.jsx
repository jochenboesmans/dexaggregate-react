import React, { lazy } from "react";
//import { connect } from "react-redux";
import reduce from "lodash/reduce";

import { formatPrice } from "../../../../util/formatFunctions";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

const unconnectedMarketPairLastPrice = ({ p }) => {
	const combinedVolume = reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0);
	const weightedSumLastTraded = reduce(p.market_data, (sum, emd) => sum + (emd.volume_dai * emd.last_traded_dai), 0);
	const volumeWeightedLastTraded = (weightedSumLastTraded / combinedVolume) || 0;
	const pairLastPrice = `${formatPrice(volumeWeightedLastTraded)}`;

	return (
		<TableCell align="right">
			{pairLastPrice}
		</TableCell>
	)
};

//const MarketPairLastPrice = connect(null, null)(unconnectedMarketPairLastPrice);
export default unconnectedMarketPairLastPrice;