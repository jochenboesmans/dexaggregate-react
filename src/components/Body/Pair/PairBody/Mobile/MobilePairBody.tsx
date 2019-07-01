import React, { lazy, FC } from "react";

import { ExchangeMarketData } from "../../../../../types/market";

const PairExchangeName = lazy(() => import(`../Common/PairExchangeName`));
const MobilePairSpread = lazy(() => import(`./MobilePairSpread`));

interface PropsType {
	emd: ExchangeMarketData,
	mostCompetitivePrices: {
		lowAsk: number,
		highBid: number
	},
}

const MobilePairBody: FC<PropsType> = ({ emd, mostCompetitivePrices }) => (
	<>
		<PairExchangeName exchangeName={emd.exchange}/>
		<MobilePairSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
	</>
);

export default MobilePairBody;