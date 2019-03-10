import React, { lazy } from "react";
import reduce from "lodash/reduce";

import { formatPrice } from "../../../../util/format";

const TableCell = lazy(() => import(`@material-ui/core/TableCell/TableCell`));
const Typography = lazy(() => import(`@material-ui/core/Typography/Typography`));

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