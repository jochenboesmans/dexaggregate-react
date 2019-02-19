import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

import * as actions from "../../../actions";
import { MarketBody } from "./MarketBody/MarketBody";
import { MarketHead } from "./MarketHead";

const unconnectedMarket = ({ market, deltaY, setSearchFilter, setDeltaY, viewport }) => {
	if(!market.market) return null;

	const marketSize = Object.keys(market.market).length;

	const vw = viewport.width || Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	const colGroup = (vw < 760) ? (
		<colgroup>
			<col style={{ width: "20%" }}/>
			<col style={{ width: "80%" }}/>
		</colgroup>
	) : (
		<colgroup>
			<col style={{ width: "15%" }}/>
			<col style={{ width: "40%" }}/>
			<col style={{ width: "20%" }}/>
			<col style={{ width: "25%" }}/>
		</colgroup>
	);

	const handleSearchChange = (e) => {
		setSearchFilter((e.target.value).toUpperCase());
		setDeltaY(0);
	};

	const handleLeftButtonClick = () => { if(deltaY - 10 >= 0) setDeltaY(deltaY - 10) };
	const handleRightButtonClick = () => { if(deltaY + 10 < marketSize) setDeltaY(deltaY + 10) };

	const tableNavigation = () => (
		<Grid
			container
			direction="row"
			alignItems="center"
			justify="center"
			spacing={8}
		>
			<Grid item>
				<IconButton
					onClick={handleLeftButtonClick}>
					<ChevronLeft/>
				</IconButton>
			</Grid>
			<Grid item>
				<Typography
					style={{ textAlign: "center" }}
					variant="caption">
					Displaying {1 + deltaY} - {Math.min(deltaY + 10, marketSize)}
				</Typography>
			</Grid>
			<Grid item>
				<IconButton
					onClick={handleRightButtonClick}>
					<ChevronRight/>
				</IconButton>
			</Grid>
		</Grid>
	);

	return (
		<Grid
			container
			direction="column"
			spacing={8}
		>
			<Grid item>
				<TextField
					className="root"
					id="token-search"
					label="Search Token/Exchange"
					type="search"
					variant="outlined"
					onChange={handleSearchChange}
					fullWidth
				/>
			</Grid>
			<Grid item>
				<Table
					padding="dense"
					style={{ tableLayout: "fixed" }}>
					{colGroup}
					<MarketHead/>
					<MarketBody/>
				</Table>
			</Grid>
			<Grid item>
				{tableNavigation()}
			</Grid>
		</Grid>
	);
};

const Market = connect(({ market, deltaY, viewport }) => ({ market, deltaY, viewport }), actions)(unconnectedMarket);

export { Market };