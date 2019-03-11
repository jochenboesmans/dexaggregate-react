import React from "react";
import reduce from "lodash/reduce";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../util/format";

const MarketPairLastPrice = ({ p }) => {
	const combinedVolume = reduce(p.m, (sum, emd) => sum + emd.v, 0);
	const weightedSumLastTraded = reduce(p.m, (sum, emd) => sum + (emd.v * emd.l), 0);
	const volumeWeightedLastTraded = (weightedSumLastTraded / combinedVolume) || 0;
	const pairLastPrice = `${formatPrice(volumeWeightedLastTraded)}`;

	return (
		<TableCell align="right">
			<Typography>
				{pairLastPrice}
			</Typography>
		</TableCell>
	);
};

export default MarketPairLastPrice;