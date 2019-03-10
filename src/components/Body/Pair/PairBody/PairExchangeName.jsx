import React, { lazy } from "react";

const TableCell = lazy(() => import(`@material-ui/core/TableCell/TableCell`));
const Typography = lazy(() => import(`@material-ui/core/Typography/Typography`));

const unconnectedPairExchangeName = ({ exchangeName }) => {
	return (
		<TableCell>
			<Typography>
				{exchangeName}
			</Typography>
		</TableCell>
	);
};

export default unconnectedPairExchangeName;