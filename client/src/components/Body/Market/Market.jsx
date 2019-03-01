import React, { lazy } from "react";
import { connect } from "react-redux";

import filter from "lodash/filter";
import find from "lodash/find";

import * as actions from "../../../actions";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Table = lazy(() => import("@material-ui/core/Table/Table"));
const TextField = lazy(() => import("@material-ui/core/TextField/TextField"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));
const IconButton = lazy(() => import("@material-ui/core/IconButton/IconButton"));
const ChevronLeft = lazy(() => import("@material-ui/icons/ChevronLeft"));
const ChevronRight = lazy(() => import("@material-ui/icons/ChevronRight"));

const MarketBody = lazy(() => import("./MarketBody/MarketBody"));
const MarketHead = lazy(() => import("./MarketHead"));

const unconnectedMarket = ({ market, deltaY, searchFilter, setSearchFilter, setDeltaY, viewport }) => {
	if(!market.market) return null;

	const filteredMarket = searchFilter ? filter(market.market, p =>
		p.base_symbol.includes(searchFilter.toUpperCase()) || p.quote_symbol.includes(searchFilter.toUpperCase())
		|| find(p.market_data, emd => emd.exchangeID.includes(searchFilter.toUpperCase()))) : market.market;
	const slicedMarket = filteredMarket.slice(0 + deltaY, 10 + deltaY);

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
	const handleRightButtonClick = () => { if(deltaY + 10 < Object.keys(filteredMarket).length) setDeltaY(deltaY + 10) };

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
					{1 + deltaY} - {Math.min(deltaY + 10, Object.keys(filteredMarket).length)} of {Object.keys(filteredMarket).length}
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
					value={searchFilter}
					fullWidth
				/>
			</Grid>
			<Grid item>
				<Table
					padding="dense"
					style={{ tableLayout: "fixed" }}>
					{colGroup}
					<MarketHead/>
					<MarketBody
						filteredMarketLength={Object.keys(filteredMarket).length}
						slicedMarket={slicedMarket}
					/>
				</Table>
			</Grid>
			<Grid item>
				{tableNavigation()}
			</Grid>
		</Grid>
	);
};

const Market = connect(({ searchFilter, market, deltaY, viewport }) => ({ searchFilter, market, deltaY, viewport }), actions)(unconnectedMarket);

export default Market;