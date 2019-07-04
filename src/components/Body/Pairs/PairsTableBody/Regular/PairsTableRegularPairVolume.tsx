import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatVolume} from "../../../../../util/format";
import {Pair} from "../../../../../types/market";
import {baseVolume} from "../../../../../util/aggregate";

interface PropsType {pair: Pair}
const PairsTableRegularPairVolume: FC<PropsType> = ({pair}) => (
	<TableCell align="right">
		<Typography>
			{formatVolume(baseVolume(pair))}
		</Typography>
	</TableCell>
);

export default PairsTableRegularPairVolume;