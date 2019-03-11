import React from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

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