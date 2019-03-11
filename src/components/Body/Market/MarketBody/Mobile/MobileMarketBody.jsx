import React, { lazy, Suspense } from "react";
import { object } from "prop-types";

const MarketPairName = lazy(() => import(`../Common/MarketPairName`));
const MobileMarketPairSpread = lazy(() => import(`./MobileMarketPairSpread`));

const MobileMarketBody = ({ p }) => (
	<Suspense fallback={<div>Loading MobileMarketBody...</div>}>
		<MarketPairName p={p}/>
		<MobileMarketPairSpread p={p}/>
	</Suspense>
);

MobileMarketBody.propTypes = {
	p: object.isRequired,
};

export default MobileMarketBody;