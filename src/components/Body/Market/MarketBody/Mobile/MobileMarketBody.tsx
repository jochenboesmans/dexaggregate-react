import React, { lazy, Suspense, FC } from "react";

const MarketPairName = lazy(() => import(`../Common/MarketPairName`));
const MobileMarketPairSpread = lazy(() => import(`./MobileMarketPairSpread`));

interface PropsType {
	p: any
}

const MobileMarketBody: FC<PropsType> = ({ p }) => (
	<>
		<MarketPairName p={p}/>
		<MobileMarketPairSpread p={p}/>
	</>
);

export default MobileMarketBody;