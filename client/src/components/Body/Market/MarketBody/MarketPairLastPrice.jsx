import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatPrice } from "../../../../util/formatFunctions";

const unconnectedMarketPairLastPrice = ({ p }) => {
	const combinedVolume = _.reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0);
	const weightedSumLastTraded = _.reduce(p.market_data, (sum, emd) => sum + (emd.volume_dai * emd.last_traded_dai), 0);
	const volumeWeightedLastTraded = (weightedSumLastTraded / combinedVolume) || 0;

	const pairLastPrice = `${formatPrice(volumeWeightedLastTraded)}`;
	return (
		<TableCell align="right">
			{pairLastPrice}
		</TableCell>
	)
};

const MarketPairLastPrice = connect(null, null)(unconnectedMarketPairLastPrice);
export { MarketPairLastPrice };