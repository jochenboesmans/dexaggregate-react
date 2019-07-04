import React, {lazy, FC} from "react";

const CurrenciesTableMobileCurrencyName = lazy(() => import("../Common/CurrenciesTableCurrencyName"));
const CurrenciesTableMobileCurrencySpread = lazy(() => import("./CurrenciesTableMobileCurrencySpread"));

interface PropsType {currency: any}
const PairsTableMobilePairBody: FC<PropsType> = ({currency}) => (
	<>
		<CurrenciesTableMobileCurrencyName currency={currency}/>
		<CurrenciesTableMobileCurrencySpread currency={currency}/>
	</>
);

export default PairsTableMobilePairBody;