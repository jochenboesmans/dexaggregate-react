import React, { lazy } from "react";

const MarketPairName = lazy(() => import(`./Common/MarketPairName`));
const MarketPairSpread = lazy(() => import(`./Regular/RegularMarketPairSpread`));
const MarketPairLastPrice = lazy(() => import(`./Regular/MarketPairLastPrice`));
const MarketPairVolume = lazy(() => import(`./Regular/MarketPairVolume`));

const RegularMarketBody = ({ p }) => (
	<>
		<MarketPairName p={p}/>
		<MarketPairSpread p={p}/>
		<MarketPairLastPrice p={p}/>
		<MarketPairVolume p={p}/>
	</>
);