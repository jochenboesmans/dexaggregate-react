import React, { FC } from "react";
import reduce from "lodash/reduce";
import maxBy from "lodash/maxBy";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";

interface PropsType {
	p: any
}

const MarketPairLastPrice: FC<PropsType> = ({ p }) => {
	const lastUpdatedEMD = maxBy(p.marketData, emd => emd.timestamp);
	const pairLastPrice = `${formatPrice(lastUpdatedEMD.lastPrice)}`;
	/*const combinedVolume = reduce(p.marketData, (sum, emd) => sum + emd.baseVolume, 0);
	const weightedSumLastTraded = reduce(p.marketData, (sum, emd) => sum + (emd.baseVolume * emd.lastPrice), 0);
	const volumeWeightedLastTraded = (weightedSumLastTraded / combinedVolume) || 0;
	const pairLastPrice = `${formatPrice(volumeWeightedLastTraded)}`;*/

	return (
		<TableCell align="right">
			<Typography>
				{pairLastPrice}
			</Typography>
		</TableCell>
	);
};

export default MarketPairLastPrice;