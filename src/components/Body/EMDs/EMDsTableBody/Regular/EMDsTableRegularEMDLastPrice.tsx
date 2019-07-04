import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import {formatPrice} from "../../../../../util/format";
import {ExchangeMarketData} from "../../../../../types/market";

interface PropsType {emd: ExchangeMarketData}
const EMDsTableRegularEMDLastPrice: FC<PropsType> = ({emd}) => (
	<TableCell align="right">
		<Typography>
			{formatPrice(emd.lastPrice)}
		</Typography>
	</TableCell>
);

export default EMDsTableRegularEMDLastPrice;