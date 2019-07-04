import React, {lazy, Suspense, FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";

const CurrenciesTableRegularCurrencyName = lazy(() => import("../Common/CurrenciesTableCurrencyName"));
const CurrenciesTableRegularCurrencySpread = lazy(() => import("./CurrenciesTableRegularCurrencySpread"));
const CurrenciesTableRegularCurrencyLastPrice = lazy(() => import("./CurrenciesTableRegularCurrencyLastPrice"));
const CurrenciesTableRegularCurrencyVolume = lazy(() => import("./CurrenciesTableRegularCurrencyVolume"));

interface PropsType {currency: any}
const CurrenciesTableRegularBody: FC<PropsType> = ({currency}) => (
	<Suspense fallback={<TableCell>Loading CurrenciesTableRegularBody...</TableCell>}>
		<CurrenciesTableRegularCurrencyName currency={currency}/>
		<CurrenciesTableRegularCurrencySpread currency={currency}/>
		<CurrenciesTableRegularCurrencyLastPrice currency={currency}/>
		<CurrenciesTableRegularCurrencyVolume currency={currency}/>
	</Suspense>
);

export default CurrenciesTableRegularBody;