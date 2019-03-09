import React, { lazy } from "react";
import reduce from "lodash/reduce";

import { formatVolume } from "../../../../util/format";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const MarketPairVolume = ({ p }) => {
	const combinedVolume = reduce(p.m, (sum, emd) => sum + emd.v, 0);

	const pairVolume = `${formatVolume(combinedVolume)}`;
	return (
		<TableCell align="right">
			<Typography>
				{pairVolume}
			</Typography>
		</TableCell>
	)
};

export default MarketPairVolume;