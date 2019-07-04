import React, {lazy, Suspense, FC} from "react";

import TableCell from "@material-ui/core/TableCell/TableCell";

import {ExchangeMarketData} from "../../../../../types/market";

const EMDsTableRegularEMDName = lazy(() => import("../Common/EMDsTableEMDName"));
const EMDsTableRegularEMDSpread = lazy(() => import("./EMDsTableRegularEMDSpread"));
const EMDsTableRegularEMDVolume = lazy(() => import("./EMDsTableRegularEMDVolume"));
const EMDsTableRegularEMDLastPrice = lazy(() => import("./EMDsTableRegularEMDLastPrice"));

interface PropsType {
	emd: ExchangeMarketData,
	mostCompetitivePrices: {
		lowAsk: number,
		highBid: number
	},
}
const EMDsTableRegularEMDBody: FC<PropsType> = ({emd, mostCompetitivePrices}) => (
	<Suspense fallback={<TableCell>Loading RegularPairBody...</TableCell>}>
		<EMDsTableRegularEMDName exchangeName={emd.exchange}/>
		<EMDsTableRegularEMDSpread emd={emd} mostCompetitivePrices={mostCompetitivePrices}/>
		<EMDsTableRegularEMDLastPrice emd={emd}/>
		<EMDsTableRegularEMDVolume emd={emd}/>
	</Suspense>
);

export default EMDsTableRegularEMDBody;