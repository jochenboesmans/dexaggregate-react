import React from "react";
import { object } from "prop-types";

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

MarketPairName.propTypes = {
	p: object.isRequired,
};

export default MarketPairName;