import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatVolume} from "../../../../../util/format";
import {ExchangeMarketData} from "../../../../../types/market";

interface PropsType {emd: ExchangeMarketData}
const EMDsTableRegularEMDVolume: FC<PropsType> = ({emd}) => (
	<TableCell align="right">
		<Typography>
			{formatVolume(emd.baseVolume)}
		</Typography>
	</TableCell>
);

export default EMDsTableRegularEMDVolume;