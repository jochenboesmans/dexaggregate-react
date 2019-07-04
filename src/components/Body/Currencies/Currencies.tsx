import React, { lazy, useContext, FC } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import Table from "@material-ui/core/Table/Table";
import TextField from "@material-ui/core/TextField/TextField";

import {
	ViewportStateContext,
	MarketStateContext,
	SearchFilterStateContext,
	SearchFilterDispatchContext,
	CurrenciesPageStateContext,
	CurrenciesPageDispatchContext,
} from "../../../state/contexts/contexts";

import {Pair} from "../../../types/market";
import {currenciesMarketData} from "../../../util/aggregate";

const CurrenciesTableBody = lazy(() => import("./CurrenciesTableBody/CurrenciesTableBody"));
const CurrenciesTableHead = lazy(() => import("./CurrenciesTableHead"));
const CurrenciesTableNavigation = lazy(() => import("./CurrenciesTableNavigation"));

const Currencies: FC = () => {
	const marketState = useContext(MarketStateContext);
	if (!marketState) return null;
	const { market } = marketState;

	const { width: vw } = useContext(ViewportStateContext);
	const currenciesPage = useContext(CurrenciesPageStateContext);
	const currenciesPageDispatch = useContext(CurrenciesPageDispatchContext);
	const searchFilter = useContext(SearchFilterStateContext);
	const searchFilterDispatch = useContext(SearchFilterDispatchContext);

	const ENTRIES_PER_PAGE = 10;
	const startIndex = currenciesPage * ENTRIES_PER_PAGE;
	const endIndex = startIndex + ENTRIES_PER_PAGE;

	const marketFilter = (p) => p.baseSymbol.includes(searchFilter.toUpperCase())
		|| p.quoteSymbol.includes(searchFilter.toUpperCase())
		|| p.marketData.some(emd => emd.exchange.toUpperCase().includes(searchFilter.toUpperCase()));

	const filteredMarket: Array<Pair> = searchFilter !== "" ? market.filter(p => marketFilter(p)) : market;

	const filteredCurrencies = currenciesMarketData(filteredMarket);

	const slicedCurrencies: Array<Pair> = filteredCurrencies.slice(startIndex, endIndex);

	const colWidths = (vw < 760) ? ["20%", "80%"] : ["15%", "40%", "20%", "25%"];
	const colGroup = (
		<colgroup>
			{colWidths.map((cw, i) => <col key={i} style={{ width: cw }}/>)}
		</colgroup>
	);

	const handleSearchChange = (e) => {
		currenciesPageDispatch({ type: "RESET" });
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
					<CurrenciesTableHead/>
					<CurrenciesTableBody
						entriesPerPage={ENTRIES_PER_PAGE}
						filteredCurrenciesLength={filteredCurrencies.length}
						slicedCurrencies={slicedCurrencies}
					/>
				</Table>
			</Grid>
			<Grid item>
				<CurrenciesTableNavigation
					entriesPerPage={ENTRIES_PER_PAGE}
					filteredCurrenciesLength={filteredCurrencies.length}
				/>
			</Grid>
		</Grid>
	);
};

export default Currencies;