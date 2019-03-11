import React from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatVolume } from "../../../../util/format";

const unconnectedPairVolume = ({ emd }) => {
	const volume = formatVolume(emd.v);
	return (
		<TableCell align="right">
			<Typography>
				{volume}
			</Typography>
		</TableCell>
	);
};

export default unconnectedPairVolume;