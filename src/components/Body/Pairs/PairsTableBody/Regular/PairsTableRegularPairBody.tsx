import React, {lazy, Suspense, FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";

import {Pair} from "../../../../../types/market";

const PairsTableRegularPairName = lazy(() => import("../Common/PairsTablePairName"));
const PairsTableRegularPairSpread = lazy(() => import("./PairsTableRegularPairSpread"));
const PairsTableRegularPairLastPrice = lazy(() => import("./PairsTableRegularPairLastPrice"));
const PairsTableRegularPairVolume = lazy(() => import("./PairsTableRegularPairVolume"));

interface PropsType {pair: Pair}
const PairsTableRegularPairBody: FC<PropsType> = ({pair}) => (
	<Suspense fallback={<TableCell>Loading PairsTableRegularBody...</TableCell>}>
		<PairsTableRegularPairName pair={pair}/>
		<PairsTableRegularPairSpread pair={pair}/>
		<PairsTableRegularPairLastPrice pair={pair}/>
		<PairsTableRegularPairVolume pair={pair}/>
	</Suspense>
);

export default PairsTableRegularPairBody;