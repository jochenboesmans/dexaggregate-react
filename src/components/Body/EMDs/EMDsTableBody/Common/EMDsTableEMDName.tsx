import React, {FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";

interface PropsType {exchangeName: string}

const EMDsTableEMDName: FC<PropsType> = ({exchangeName}) => (
	<TableCell>
		<Typography>
			{exchangeName.toUpperCase()}
		</Typography>
	</TableCell>
);

export default EMDsTableEMDName;