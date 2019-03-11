import React from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

const MarketPairName = ({ p }) => {
	const pairName = `${p.b}/${p.q}`;
	return (
		<TableCell>
			<Typography>
				{pairName}
			</Typography>
		</TableCell>
	);
};

export default MarketPairName;