import React, { lazy } from "react";
//import { connect } from "react-redux";
import reduce from "lodash/reduce";

import { formatVolume } from "../../../../util/formatFunctions";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

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