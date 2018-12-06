import React from "react";

import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Typography from "@material-ui/core/Typography/Typography";

const PairHead = ({p}) => (
		<TableHead>
			<TableRow>
				<TableCell>
					<Typography style={{color: "black", fontWeight: "bold"}}>Exchange</Typography>
				</TableCell>
				<TableCell numeric>
					<Typography style={{color: "black", fontWeight: "bold"}}>Current Spread of {p.quote_symbol} [DAI]</Typography>
				</TableCell>
				<TableCell numeric>
					<Typography style={{color: "black", fontWeight: "bold"}}>Last Price of {p.quote_symbol} [DAI]</Typography>
				</TableCell>
				<TableCell numeric>
					<Typography style={{color: "black", fontWeight: "bold"}}>Volume (24h) [DAI]</Typography>
				</TableCell>
			</TableRow>
		</TableHead>
);

export default PairHead;