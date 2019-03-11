import React, { lazy, Suspense } from "react";
import { object } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";

const MarketPairName = lazy(() => import(`../Common/MarketPairName`));
const MarketPairSpread = lazy(() => import(`./RegularMarketPairSpread`));
const MarketPairLastPrice = lazy(() => import(`./MarketPairLastPrice`));
const MarketPairVolume = lazy(() => import(`./MarketPairVolume`));

const RegularMarketBody = ({ p }) => (
	<Suspense fallback={<TableCell>Loading RegularMarketBody...</TableCell>}>
		<MarketPairName p={p}/>
		<MarketPairSpread p={p}/>
		<MarketPairLastPrice p={p}/>
		<MarketPairVolume p={p}/>
	</Suspense>
);

RegularMarketBody.propTypes = {
	p: object.isRequired,
};

export default RegularMarketBody;