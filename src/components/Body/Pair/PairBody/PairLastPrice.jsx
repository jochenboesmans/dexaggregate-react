import React, { lazy } from "react";

import { formatPrice } from "../../../../util/format";

const TableCell = lazy(() => import(`@material-ui/core/TableCell/TableCell`));
const Typography = lazy(() => import(`@material-ui/core/Typography/Typography`));

const PairLastPrice = ({ emd }) => {
	const lastPrice = formatPrice(emd.l);
	return (
		<TableCell align="right">
			<Typography>
				{lastPrice}
			</Typography>
		</TableCell>
	);
};

export default PairLastPrice;