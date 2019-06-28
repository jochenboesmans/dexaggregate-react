import React, { lazy, Suspense, FC } from "react";

const PairExchangeName = lazy(() => import(`../Common/PairExchangeName`));
const MobilePairSpread = lazy(() => import(`./MobilePairSpread`));

interface PropsType {
	emd: any,
	mostCompetitivePrices: any,
}

const MobilePairBody: FC<PropsType> = ({ emd, mostCompetitivePrices }) => (
	<Suspense fallback={<div>Loading MobilePairBody...</div>}>
		<PairExchangeName exchangeName={emd.exchange}/>
		<MobilePairSpread emd={emd} mostCompetitivePrice={mostCompetitivePrices}/>
	</Suspense>
);

export default MobilePairBody;