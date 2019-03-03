import React, { lazy } from "react";
//import { connect } from "react-redux";

import { formatVolume } from "../../../../util/formatFunctions";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));

const unconnectedPairVolume = ({ emd }) => {
	const volume = emd.volume_dai;
	return (
		<TableCell align="right">
			{formatVolume(volume)}
		</TableCell>
	)
};

//const PairVolume = connect(null, null)(unconnectedPairVolume);
export default unconnectedPairVolume;