import React, { lazy } from "react";
import { connect } from "react-redux";

import * as actions from "../../../actions";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Table = lazy(() => import("@material-ui/core/Table/Table"));
const TextField = lazy(() => import("@material-ui/core/TextField/TextField"));

const MarketBody = lazy(() => import("./MarketBody/MarketBody"));
const MarketHead = lazy(() => import("./MarketHead"));
const TableNavigation = lazy(() => import("./TableNavigation"));

const unconnectedMarket = ({ market, deltaY, searchFilter, setSearchFilter, setDeltaY, viewport }) => {
	if(!market.market) return null;

	const filteredMarket = searchFilter ? market.market.filter(p =>
		p.base_symbol.includes(searchFilter.toUpperCase()) || p.quote_symbol.includes(searchFilter.toUpperCase())
		|| Object.keys(p.market_data).find(exchangeID => exchangeID.includes(searchFilter.toUpperCase()))) : market.market;
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
						filteredMarketLength={filteredMarket.length}
						slicedMarket={slicedMarket}
					/>
				</Table>
			</Grid>
			<Grid item>
				<TableNavigation
					filteredMarketLength={filteredMarket.length}
				/>
			</Grid>
		</Grid>
	);
};

const Market = connect(({ searchFilter, market, deltaY, viewport }) => ({ searchFilter, market, deltaY, viewport }), actions)(unconnectedMarket);

export default Market;