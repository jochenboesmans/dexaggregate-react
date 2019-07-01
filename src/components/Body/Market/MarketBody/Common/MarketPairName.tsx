import React, { FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

import { Pair } from "../../../../../types/market";

interface PropsType { p: Pair }

const MarketPairName: FC<PropsType> = ({ p }) => {
	const pairName = `${p.baseSymbol}/${p.quoteSymbol}`;
	return (
		<TableCell>
			<Typography>
				{pairName}
			</Typography>
		</TableCell>
	);
};

export default MarketPairName;