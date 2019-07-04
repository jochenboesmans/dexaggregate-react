import React, {lazy, FC} from "react";

import {ExchangeMarketData} from "../../../../../types/market";

const EMDsTableMobileEMDName = lazy(() => import("../Common/EMDsTableEMDName"));
const EMDsTableMobileEMDSpread = lazy(() => import("./EMDsTableMobileEMDSpread"));

interface PropsType {
	emd: ExchangeMarketData,
	mostCompetitivePrices: {
		lowAsk: number,
		highBid: number
	},
}
const EMDsTableMobileEMDBody: FC<PropsType> = ({emd, mostCompetitivePrices}) => (
	<>
		<EMDsTableMobileEMDName exchangeName={emd.exchange}/>
		<EMDsTableMobileEMDSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
	</>
);

export default EMDsTableMobileEMDBody;