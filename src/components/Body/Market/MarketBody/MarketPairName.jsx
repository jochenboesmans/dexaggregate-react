import React, { lazy } from "react";

const TableCell = lazy(() => import("@material-ui/core/TableCell/TableCell"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const MarketPairName = ({ p }) => {
	const pairName = `${p.b}/${p.q}`;
	return (
		<TableCell>
			<Typography>
				{pairName}
			</Typography>
		</TableCell>
	)
};

export default MarketPairName;