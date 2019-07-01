import React, { lazy, FC } from "react";

const PairExchangeName = lazy(() => import(`../Common/PairExchangeName`));
const MobilePairSpread = lazy(() => import(`./MobilePairSpread`));

export interface PropsType {
	emd: any,
	mostCompetitivePrices: any,
}

const MobilePairBody: FC<PropsType> = ({ emd, mostCompetitivePrices }) => (
	<>
		<PairExchangeName exchangeName={emd.exchange}/>
		<MobilePairSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
	</>
);

export default MobilePairBody;