import React from "react";
import { object } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatVolume } from "../../../../../util/format";

const PairVolume = ({ emd }) => {
	const volume = formatVolume(emd.v);
	return (
		<TableCell align="right">
			<Typography>
				{volume}
			</Typography>
		</TableCell>
	);
};

PairVolume.propTypes = {
	emd: object.isRequired,
};

export default PairVolume;