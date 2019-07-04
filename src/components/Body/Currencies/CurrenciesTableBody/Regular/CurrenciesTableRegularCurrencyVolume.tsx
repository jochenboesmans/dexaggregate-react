import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatVolume} from "../../../../../util/format";

interface PropsType {currency: any}
const PairsTableRegularPairVolume: FC<PropsType> = ({currency}) => (
	<TableCell align="right">
		<Typography>
			{formatVolume(currency.baseVolume)}
		</Typography>
	</TableCell>
);

export default PairsTableRegularPairVolume;