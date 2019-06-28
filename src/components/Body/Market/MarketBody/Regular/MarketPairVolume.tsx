import React, { FC } from "react";
import reduce from "lodash/reduce";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatVolume } from "../../../../../util/format";

interface PropsType {
	p: any
}

const MarketPairVolume: FC<PropsType> = ({ p }) => {
	const combinedVolume = reduce(p.marketData, (sum, emd) => sum + emd.baseVolume, 0);

	const pairVolume = `${formatVolume(combinedVolume)}`;
	return (
		<TableCell align="right">
			<Typography>
				{pairVolume}
			</Typography>
		</TableCell>
	);
};

export default MarketPairVolume;