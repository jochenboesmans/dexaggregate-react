
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";

import * as actions from "../../../actions";
import { MarketBody } from "./MarketBody/MarketBody";
import { MarketHead } from "./MarketHead/MarketHead";

const unconnectedMarket = ({ market, deltaY, setSearchFilter, setDeltaY, viewport}) => {
	const marketSize = market.market ? Object.keys(market.market).length : 0;
	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const initialVH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	const vw = viewport.width || initialVW;
	const vh = viewport.height || initialVH;
	if (vw < 760) {
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
						onChange={(e) => {
							setSearchFilter((e.target.value).toUpperCase());
							setDeltaY(0);
						}}
						fullWidth
					/>
				</Grid>
				<Grid item>
					<Table
						padding="dense"
						style={{ tableLayout: "fixed" }}>
						<colgroup>
							<col style={{ width: "20%" }}/>
							<col style={{ width: "80%" }}/>
						</colgroup>
						<MarketHead/>
						<MarketBody/>
					</Table>
				</Grid>
				<Grid item>
					<Grid
						container
						direction="row"
						alignItems="center"
						justify="center"
						spacing={8}
					>
						<Grid item>
							<IconButton
								onClick={() => { if (deltaY-10 >= 0) setDeltaY(deltaY - 10) }}>
								<ChevronLeft/>
							</IconButton>
						</Grid>
						<Grid item>
							<Typography
								style={{textAlign: "center"}}
								variant="caption">
								Displaying {1 + deltaY} - {Math.min(deltaY + 10, marketSize)}
							</Typography>
						</Grid>
						<Grid item>
							<IconButton
								onClick={() => { if (deltaY+10 < marketSize) setDeltaY(deltaY + 10) }}>
								<ChevronRight/>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	} else {
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
						onChange={(e) => {
							setSearchFilter((e.target.value).toUpperCase());
							setDeltaY(0);
						}}
						fullWidth
					/>
				</Grid>
				<Grid item>
					<Table
						padding="dense"
						style={{ tableLayout: "fixed" }}>
						<colgroup>
							<col style={{ width: "15%" }}/>
							<col style={{ width: "40%" }}/>
							<col style={{ width: "20%" }}/>
							<col style={{ width: "25%" }}/>
						</colgroup>
						<MarketHead/>
						<MarketBody/>
					</Table>
				</Grid>
				<Grid item>
					<Grid
						container
						direction="row"
						alignItems="center"
						justify="center"
						spacing={8}
					>
						<Grid item>
							<IconButton
								onClick={() => { if (deltaY-10 >= 0) setDeltaY(deltaY - 10) }}>
								<ChevronLeft/>
							</IconButton>
						</Grid>
						<Grid item>
							<Typography
								style={{textAlign: "center"}}
								variant="caption">
								Displaying {1 + deltaY} - {Math.min(deltaY + 10, marketSize)}
							</Typography>
						</Grid>
						<Grid item>
							<IconButton
								onClick={() => { if (deltaY+10 < marketSize) setDeltaY(deltaY + 10) }}>
								<ChevronRight/>
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	}
};

const Market = connect(({ market, deltaY, viewport }) => ({ market, deltaY, viewport }), actions)(unconnectedMarket);

export { Market };