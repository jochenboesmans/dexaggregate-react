import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";

import * as actions from "../../../actions";
import { MarketBody } from "./MarketBody/MarketBody";
import { MarketHead } from "./MarketHead/MarketHead";

const unconnectedMarket = ({ market, deltaY, setSearchFilter, setDeltaY }) => {
	const marketSize = market.market ? market.market.length : 0;
	return (
		<Grid
			container
			direction="column"
			justify="space-between"
			style={{width: "80vw"}}
			spacing={8}
		>
			<Grid item>
				<TextField
					className="root"
					id="token-search"
					label="Token search"
					type="search"
					variant="outlined"
					onChange={(e) => {
						setSearchFilter((e.target.value).toUpperCase());
						setDeltaY(0);
					}}
					fullWidth
				/>
			</Grid>
			<Grid item>
				<Table>
					<MarketHead/>
					<MarketBody/>
				</Table>
			</Grid>
			<Grid item>
				<Typography style={{textAlign: "center"}} variant="caption">Displaying {1 + deltaY} - {Math.min(deltaY + 10, marketSize)}</Typography>
			</Grid>
		</Grid>
)
};

const Market = connect(({ market, deltaY }) => ({ market, deltaY }), actions)(unconnectedMarket);

export { Market };