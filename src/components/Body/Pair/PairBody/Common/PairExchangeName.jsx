import React from "react";
import { string } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

const PairExchangeName = ({ exchangeName }) => {
	return (
		<TableCell>
			<Typography>
				{exchangeName}
			</Typography>
		</TableCell>
	);
};

PairExchangeName.propTypes = {
	exchangeName: string.isRequired,
};

export default PairExchangeName;