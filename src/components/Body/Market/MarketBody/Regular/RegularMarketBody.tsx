import React, { lazy, Suspense, FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";

import { Pair } from "../../../../../types/market";

const MarketPairName = lazy(() => import(`../Common/MarketPairName`));
const MarketPairSpread = lazy(() => import(`./RegularMarketPairSpread`));
const MarketPairLastPrice = lazy(() => import(`./MarketPairLastPrice`));
const MarketPairVolume = lazy(() => import(`./MarketPairVolume`));

interface PropsType { p: Pair }

const RegularMarketBody: FC<PropsType> = ({ p }) => (
	<Suspense fallback={<TableCell>Loading RegularMarketBody...</TableCell>}>
		<MarketPairName p={p}/>
		<MarketPairSpread p={p}/>
		<MarketPairLastPrice p={p}/>
		<MarketPairVolume p={p}/>
	</Suspense>
);

export default RegularMarketBody;