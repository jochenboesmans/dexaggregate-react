import React, { FC } from "react";
import { object } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

interface PropsType {
	p: any
}

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