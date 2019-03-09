import React, { lazy } from "react";

import { formatVolume } from "../../../../util/format";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const unconnectedPairVolume = ({ emd }) => {
	const volume = formatVolume(emd.v);
	return (
		<TableCell align="right">
			<Typography>
				{volume}
			</Typography>
		</TableCell>
	)
};

export default unconnectedPairVolume;