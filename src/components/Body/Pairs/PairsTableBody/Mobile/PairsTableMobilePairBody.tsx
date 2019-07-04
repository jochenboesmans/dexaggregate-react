import React, {lazy, FC} from "react";

import {Pair} from "../../../../../types/market";

const PairsTableMobilePairName = lazy(() => import("../Common/PairsTablePairName"));
const PairsTableMobilePairSpread = lazy(() => import("./PairsTableMobilePairSpread"));

interface PropsType {pair: Pair}
const PairsTableMobilePairBody: FC<PropsType> = ({pair}) => (
	<>
		<PairsTableMobilePairName pair={pair}/>
		<PairsTableMobilePairSpread pair={pair}/>
	</>
);

export default PairsTableMobilePairBody;