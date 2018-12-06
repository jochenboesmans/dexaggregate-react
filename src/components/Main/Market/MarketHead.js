import React from "react";

import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableHead from "@material-ui/core/TableHead/TableHead";
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from '@material-ui/core/Tooltip';

const MarketHead = () => {
	const columnOneDescription = `A market pair is defined by a base token and quote token. A ratio between a base token and quote token indicates how much of the quote token is needed to purchase one unit of the base token.`;
	const columnTwoDescription = `The difference between the highest current bid ratio and the lowest current ask ratio across all exchanges for the given market pair. Negative values (where the lowest current ask is lower than the highest current bid) indicate potential arbitrage opportunities between exchanges. Substantial arbitrage opportunities are highlighted in red. All ratios are denominated in DAI for readability and ease of interpretation.`;
	const columnThreeDescription = `A volume-weighted sum of all exchanges' last traded ratios for the given market pair. All ratios are denominated in DAI for readability and ease of interpretation.`;
	const columnFourDescription = `A sum of all exchanges' past 24 hour volumes for the given market pair. All volumes are denominated in DAI for readability and ease of interpretation.`;
	return (
		<TableHead className="tableHead">
			<TableRow>
				<TableCell>
					<Tooltip title={columnOneDescription} placement="top">
						<Typography style={{color: "black", fontWeight: "bold"}}>Base Token / Quote Token</Typography>
					</Tooltip>
				</TableCell>
				<TableCell numeric>
					<Tooltip title={columnTwoDescription} placement="top">
						<Typography style={{color: "black", fontWeight: "bold"}}>Quote Token Current Spread [DAI]</Typography>
					</Tooltip>
				</TableCell>
				<TableCell numeric>
					<Tooltip title={columnThreeDescription} placement="top">
						<Typography style={{color: "black", fontWeight: "bold"}}>Quote Token Last Price [DAI]</Typography>
					</Tooltip>
				</TableCell>
				<TableCell numeric>
					<Tooltip title={columnFourDescription} placement="top">
						<Typography style={{color: "black", fontWeight: "bold"}}>Volume (24h) [DAI]</Typography>
					</Tooltip>
				</TableCell>
			</TableRow>
		</TableHead>
	)
};

export default MarketHead;