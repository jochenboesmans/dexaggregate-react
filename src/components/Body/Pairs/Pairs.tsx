import React, { lazy, useContext, FC } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import TextField from "@material-ui/core/TextField/TextField";

import {
	ViewportStateContext,
	MarketStateContext,
	MarketPageStateContext,
	MarketPageDispatchContext,
	SearchFilterStateContext,
	SearchFilterDispatchContext, ActivePageStateContext,
} from "../../../state/contexts/contexts";

import { Pair } from "../../../types/market";

const PairsTableBody = lazy(() => import("./PairsTableBody/PairsTableBody"));
const PairsTableHead = lazy(() => import("./PairsTableHead"));
const PairsTableNavigation = lazy(() => import("./PairsTableNavigation"));

const Pairs: FC = () => {
	const marketState = useContext(MarketStateContext);
	if (!marketState) return null;
	const { market } = marketState;

	const { width: vw } = useContext(ViewportStateContext);
	const marketPage = useContext(MarketPageStateContext);
	const marketPageDispatch = useContext(MarketPageDispatchContext);
	const searchFilter = useContext(SearchFilterStateContext);
	const searchFilterDispatch = useContext(SearchFilterDispatchContext);
	const {currency} = useContext(ActivePageStateContext);

	const ENTRIES_PER_PAGE = 10;
	const startIndex = marketPage * ENTRIES_PER_PAGE;
	const endIndex = startIndex + ENTRIES_PER_PAGE;

	const marketFilter = (p) => p.baseSymbol.includes(searchFilter.toUpperCase())
		|| p.quoteSymbol.includes(searchFilter.toUpperCase())
		|| p.marketData.some(emd => emd.exchange.toUpperCase().includes(searchFilter.toUpperCase()));

	const filteredMarket: Array<Pair> = searchFilter !== "" ? market.filter(p => marketFilter(p)) : market;
	const filteredByCurrency: Array<Pair> = filteredMarket.filter(p => p.quoteSymbol === currency);
	const slicedMarket: Array<Pair> = filteredByCurrency.slice(startIndex, endIndex);

	const colWidths = (vw < 760) ? ["20%", "80%"] : ["15%", "40%", "20%", "25%"];
	const colGroup = (
		<colgroup>
			{colWidths.map((cw, i) => <col key={i} style={{ width: cw }}/>)}
		</colgroup>
	);

	const handleSearchChange = (e) => {
		marketPageDispatch({ type: "RESET" });
		searchFilterDispatch({ type: "SET", payload: e.target.value });
	};

	return (
		<Grid container direction="column" spacing={1}>
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
				<Table padding="checkbox" style={{ tableLayout: "fixed" }}>
					{colGroup}
					<PairsTableHead/>
					<PairsTableBody
						entriesPerPage={ENTRIES_PER_PAGE}
						filteredMarketLength={filteredByCurrency.length}
						slicedMarket={slicedMarket}
					/>
				</Table>
			</Grid>
			<Grid item>
				<PairsTableNavigation
					entriesPerPage={ENTRIES_PER_PAGE}
					filteredMarketLength={filteredByCurrency.length}
				/>
			</Grid>
		</Grid>
	);
};

export default Pairs;