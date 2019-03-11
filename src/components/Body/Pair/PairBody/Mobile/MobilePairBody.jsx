import React, { lazy, Suspense } from "react";
import { string, object } from "prop-types";

const PairExchangeName = lazy(() => import(`../Common/PairExchangeName`));
const MobilePairSpread = lazy(() => import(`./MobilePairSpread`));

const MobilePairBody = ({ exchanges, emd, mostCompetitivePrices }) => (
	<Suspense fallback={<div>Loading MobilePairBody...</div>}>
		<PairExchangeName exchangeName={exchanges[emd.e].name}/>
		<MobilePairSpread emd={emd} mostCompetitivePrice={mostCompetitivePrices}/>
	</Suspense>
);

MobilePairBody.propTypes = {
	exchanges: string.isRequired,
	emd: object.isRequired,
	mostCompetitivePrices: object.isRequired,
};

export default MobilePairBody;