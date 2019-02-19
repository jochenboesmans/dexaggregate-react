import React from "react";
import { connect } from "react-redux";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { formatVolume } from "../../../../util/formatFunctions";

const unconnectedPairVolume = ({ emd }) => {
	const volume = emd.volume_dai;
	return (
		<TableCell align="right">
			{formatVolume(volume)}
		</TableCell>
	)
};

const PairVolume = connect(null, null)(unconnectedPairVolume);
export { PairVolume };