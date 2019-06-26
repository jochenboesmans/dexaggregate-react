import React from "react";
import { object } from "prop-types";
import reduce from "lodash/reduce";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";

const MarketPairLastPrice = ({ p }) => {
	const combinedVolume = reduce(p.marketData, (sum, emd) => sum + emd.baseVolume, 0);
	const weightedSumLastTraded = reduce(p.marketData, (sum, emd) => sum + (emd.baseVolume * emd.lastPrice), 0);
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

MarketPairLastPrice.propTypes = {
	p: object.isRequired,
};

export default MarketPairLastPrice;