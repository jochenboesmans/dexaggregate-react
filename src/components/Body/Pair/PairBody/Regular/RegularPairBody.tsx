import React, { lazy, Suspense, FC } from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";

const PairExchangeName = lazy(() => import(`../Common/PairExchangeName`));
const PairSpread = lazy(() => import(`./PairSpread`));
const PairVolume = lazy(() => import(`./PairVolume`));
const PairLastPrice = lazy(() => import(`./PairLastPrice`));

interface PropsType {
	exchanges: Array<string>,
	emd: any,
	mostCompetitivePrices: any,
}
const RegularPairBody: FC<PropsType> = ({ exchanges, emd, mostCompetitivePrices }) => (
	<Suspense fallback={<TableCell>Loading RegularPairBody...</TableCell>}>
		<PairExchangeName exchangeName={emd.exchange}/>
		<PairSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
		<PairLastPrice emd={emd}/>
		<PairVolume emd={emd}/>
	</Suspense>
);

export default RegularPairBody;