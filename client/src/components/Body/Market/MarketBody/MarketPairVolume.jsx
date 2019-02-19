import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatVolume } from "../../../../util/formatFunctions";

const unconnectedMarketPairVolume = ({ p }) => {
	const combinedVolume = _.reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0);

	const pairVolume = `${formatVolume(combinedVolume)}`;
	return (
		<TableCell align="right">
			{pairVolume}
		</TableCell>
	)
};

const MarketPairVolume = connect(null, null)(unconnectedMarketPairVolume);
export { MarketPairVolume };