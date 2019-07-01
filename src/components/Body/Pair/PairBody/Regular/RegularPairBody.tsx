import React, { lazy, Suspense, FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";
import { ExchangeMarketData } from "../../../../../types/market";

const PairExchangeName = lazy(() => import(`../Common/PairExchangeName`));
const PairSpread = lazy(() => import(`./PairSpread`));
const PairVolume = lazy(() => import(`./PairVolume`));
const PairLastPrice = lazy(() => import(`./PairLastPrice`));

interface PropsType {
	exchanges: Array<string>,
	emd: ExchangeMarketData,
	mostCompetitivePrices: {
		lowAsk: number,
		highBid: number
	},
}
const RegularPairBody: FC<PropsType> = ({ emd, mostCompetitivePrices }) => (
	<Suspense fallback={<TableCell>Loading RegularPairBody...</TableCell>}>
		<PairExchangeName exchangeName={emd.exchange}/>
		<PairSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
		<PairLastPrice emd={emd}/>
		<PairVolume emd={emd}/>
	</Suspense>
);

export default RegularPairBody;