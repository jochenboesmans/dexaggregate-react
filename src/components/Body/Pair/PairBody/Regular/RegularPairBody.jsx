import React, { lazy, Suspense } from "react";
import { object } from "prop-types";

import TableCell from "@material-ui/core/TableCell/TableCell";

const PairExchangeName = lazy(() => import(`../Common/PairExchangeName`));
const PairSpread = lazy(() => import(`./PairSpread`));
const PairVolume = lazy(() => import(`./PairVolume`));
const PairLastPrice = lazy(() => import(`./PairLastPrice`));

const RegularPairBody = ({ exchanges, emd, mostCompetitivePrices }) => (
	<Suspense fallback={<TableCell>Loading RegularPairBody...</TableCell>}>
		<PairExchangeName exchangeName={emd.exchange}/>
		<PairSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
		<PairLastPrice emd={emd}/>
		<PairVolume emd={emd}/>
	</Suspense>
);

RegularPairBody.propTypes = {
	exchanges: object.isRequired,
	emd: object.isRequired,
	mostCompetitivePrices: object.isRequired,
};

export default RegularPairBody;