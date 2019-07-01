import React, { FC } from "react";
import maxBy from "lodash/maxBy";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { formatPrice } from "../../../../../util/format";
import { ExchangeMarketData, Pair} from "../../../../../types/market";

interface PropsType { p: Pair }

const MarketPairLastPrice: FC<PropsType> = ({ p }) => {
	const lastUpdatedEMD: ExchangeMarketData = maxBy(p.marketData, emd => emd.timestamp);
	const pairLastPrice = `${formatPrice(lastUpdatedEMD.lastPrice)}`;
	return (
		<TableCell align="right">
			<Typography>
				{pairLastPrice}
			</Typography>
		</TableCell>
	);
};

export default MarketPairLastPrice;