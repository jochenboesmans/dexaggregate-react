import React from "react";
//import { connect } from "react-redux";
import { reduce } from "lodash/core";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatVolume } from "../../../../util/formatFunctions";

const unconnectedMarketPairVolume = ({ p }) => {
	const combinedVolume = reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0);

	const pairVolume = `${formatVolume(combinedVolume)}`;
	return (
		<TableCell align="right">
			{pairVolume}
		</TableCell>
	)
};

//const MarketPairVolume = connect(null, null)(unconnectedMarketPairVolume);
export default unconnectedMarketPairVolume;