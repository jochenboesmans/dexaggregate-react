import React, { lazy, FC } from "react";

import { Pair } from "../../../../../types/market";

const MarketPairName = lazy(() => import(`../Common/MarketPairName`));
const MobileMarketPairSpread = lazy(() => import(`./MobileMarketPairSpread`));

interface PropsType { p: Pair }

const MobileMarketBody: FC<PropsType> = ({ p }) => (
	<>
		<MarketPairName p={p}/>
		<MobileMarketPairSpread p={p}/>
	</>
);

export default MobileMarketBody;