import React, { lazy, useContext, FC } from "react";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";

import {
	ActivePageDispatchContext,
	CurrenciesPageDispatchContext,
	CurrenciesPageStateContext,
	ViewportStateContext,
} from "../../../../state/contexts/contexts";

const CurrenciesTableRegularCurrencyBody = lazy(() => import("./Regular/CurrenciesTableRegularCurrencyBody"));
const CurrenciesTableMobileCurrencyBody = lazy(() => import("./Mobile/CurrenciesTableMobileCurrencyBody"));

interface PropsType {
	entriesPerPage: number,
	filteredCurrenciesLength: number,
	slicedCurrencies: Array<any>
}

const CurrenciesTableBody: FC<PropsType> = ({ entriesPerPage, filteredCurrenciesLength, slicedCurrencies }) => {
	const { width: vw } = useContext(ViewportStateContext);
	const currenciesPage = useContext(CurrenciesPageStateContext);
	const currenciesPageDispatch = useContext(CurrenciesPageDispatchContext);
	const activePageDispatch = useContext(ActivePageDispatchContext);

	const innerContent = (currency) => (vw < 760) ?
		<CurrenciesTableMobileCurrencyBody currency={currency}/>
		: <CurrenciesTableRegularCurrencyBody currency={currency}/>;

	const handleWheelEvent = (e) => {
		if (e.deltaY < 0 && currenciesPage > 0) {
			currenciesPageDispatch({type: "DECREMENT"});
		} else if (e.deltaY > 0 && (currenciesPage * entriesPerPage) + entriesPerPage < filteredCurrenciesLength) {
			currenciesPageDispatch({type: "INCREMENT"});
		}
	};

	return (
		<TableBody onWheel={handleWheelEvent}>
			{slicedCurrencies.map(c => {
				return (
					<TableRow
						style={{ height: "4vh" }}
						hover
						onClick={() => activePageDispatch({ type: "SET_CURRENCY", payload: c.quoteSymbol})}
						key={c.quoteSymbol}
					>
						{innerContent(c)}
					</TableRow>
				);
			})}
		</TableBody>
	);
};

export default CurrenciesTableBody;