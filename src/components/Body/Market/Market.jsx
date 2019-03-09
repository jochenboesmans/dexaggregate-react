import React, { lazy, useReducer, useContext } from "react";

import { ViewportStateContext, MarketStateContext } from "../../../contexts/contexts";
import { marketPageReducer, searchFilterReducer } from "../../../reducers/reducers";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Table = lazy(() => import("@material-ui/core/Table/Table"));
const TextField = lazy(() => import("@material-ui/core/TextField/TextField"));

const MarketBody = lazy(() => import("./MarketBody/MarketBody"));
const MarketHead = lazy(() => import("./MarketHead"));
const TableNavigation = lazy(() => import("./TableNavigation"));

const Market = () => {
	const [marketPage, marketPageDispatch] = useReducer(marketPageReducer, 0);
	const [searchFilter, searchFilterDispatch] = useReducer(searchFilterReducer, ``);

	const market = useContext(MarketStateContext);
	const viewport = useContext(ViewportStateContext);

	if (!market.market) return null;

	const ENTRIES_PER_PAGE = 10;
	const startIndex = marketPage * ENTRIES_PER_PAGE;
	const endIndex = startIndex + ENTRIES_PER_PAGE;

	const filteredMarket = searchFilter ? market.market.filter(p =>
		p.b.includes(searchFilter.toUpperCase()) || p.q.includes(searchFilter.toUpperCase())
		|| Object.keys(p.m).find(exchangeID => exchangeID.includes(searchFilter.toUpperCase()))) : market.market;
	const slicedMarket = filteredMarket.slice(startIndex, endIndex);

	const colGroup = (viewport.width < 760) ? (
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
		marketPageDispatch({ type: `RESET` });
		searchFilterDispatch({ type: `SET`, payload: e.target.value });
	};

	return (
		<MarketPageDispatchContext.Provider value={marketPageDispatch}>
			<MarketPageStateContext.Provider value={marketPage}>
				<SearchFilterDispatchContext.Provider value={searchFilterDispatch}>
					<SearchFilterStateContext.Provider value={searchFilter}>
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
									entriesPerPage={ENTRIES_PER_PAGE}
									filteredMarketLength={filteredMarket.length}/>
							</Grid>
						</Grid>
					</SearchFilterStateContext.Provider>
				</SearchFilterDispatchContext.Provider>
			</MarketPageStateContext.Provider>
		</MarketPageDispatchContext.Provider>
	);
};

export default Market;
export {
	MarketPageDispatchContext,
	MarketPageStateContext,
	SearchFilterDispatchContext,
	SearchFilterStateContext,
}