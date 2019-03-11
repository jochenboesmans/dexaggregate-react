import React, { lazy, useReducer, useContext } from "react";

import {
	ViewportStateContext,
	MarketStateContext,
	MarketPageStateContext,
	MarketPageDispatchContext,
	SearchFilterStateContext,
	SearchFilterDispatchContext,
} from "../../../state/contexts/contexts";
import { marketPageReducer, searchFilterReducer } from "../../../state/reducers/reducers";

const Grid = lazy(() => import(`@material-ui/core/Grid/Grid`));
const Table = lazy(() => import(`@material-ui/core/Table/Table`));
const TextField = lazy(() => import(`@material-ui/core/TextField/TextField`));

const MarketBody = lazy(() => import(`./MarketBody/MarketBody`));
const MarketHead = lazy(() => import(`./MarketHead`));
const TableNavigation = lazy(() => import(`./TableNavigation`));

const Market = () => {
	const market = useContext(MarketStateContext);
	if (!market.market) return null;

	const viewport = useContext(ViewportStateContext);
	const marketPage = useContext(MarketPageStateContext);
	const marketPageDispatch = useContext(MarketPageDispatchContext);
	const searchFilter = useContext(SearchFilterStateContext);
	const searchFilterDispatch = useContext(SearchFilterDispatchContext);

	const ENTRIES_PER_PAGE = 10;
	const startIndex = marketPage * ENTRIES_PER_PAGE;
	const endIndex = startIndex + ENTRIES_PER_PAGE;

	const filteredMarket = searchFilter !== `` ? market.market.filter(p =>
		p.b.includes(searchFilter.toUpperCase()) || p.q.includes(searchFilter.toUpperCase())
		|| Object.keys(p.m).find(exchangeID => exchangeID.includes(searchFilter.toUpperCase()))) : market.market;
	const slicedMarket = filteredMarket.slice(startIndex, endIndex);

	const colGroup = (viewport.width < 760) ? (
		<colgroup>
			<col style={{ width: `20%` }}/>
			<col style={{ width: `80%` }}/>
		</colgroup>
	) : (
		<colgroup>
			<col style={{ width: `15%` }}/>
			<col style={{ width: `40%` }}/>
			<col style={{ width: `20%` }}/>
			<col style={{ width: `25%` }}/>
		</colgroup>
	);

	const handleSearchChange = (e) => {
		marketPageDispatch({ type: `RESET` });
		searchFilterDispatch({ type: `SET`, payload: e.target.value });
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
					style={{ tableLayout: `fixed` }}>
					{colGroup}
					<MarketHead/>
					<MarketBody
						entriesPerPage={ENTRIES_PER_PAGE}
						filteredMarketLength={filteredMarket.length}
						slicedMarket={slicedMarket}
					/>
				</Table>
			</Grid>
			<Grid item>
				<TableNavigation
					entriesPerPage={ENTRIES_PER_PAGE}
					filteredMarketLength={filteredMarket.length}/>
			</Grid>
		</Grid>
	);
};

export default Market;