import React, { FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatVolume } from "../../../../../util/format";

interface PropsType {
	emd: any
}

const PairVolume: FC<PropsType> = ({ emd }) => {
	const volume = formatVolume(emd.baseVolume);
	return (
		<TableCell align="right">
			<Typography>
				{volume}
			</Typography>
		</TableCell>
	);
};

export default PairVolume;