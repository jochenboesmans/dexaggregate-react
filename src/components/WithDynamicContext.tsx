import React, {FC, lazy, useContext, useEffect, Suspense} from "react";

import { MarketDispatchContext, TimeDispatchContext, ViewportDispatchContext } from "../state/contexts/contexts";
import { subscribeToMarket, unsubscribeFromMarket } from "../marketclient";

import WithStyle from "./WithStyle";

/* Handles all global side effects. */
const WithDynamicContext: FC = () => {
	const viewportDispatch = useContext(ViewportDispatchContext);
	const marketDispatch = useContext(MarketDispatchContext);
	const timeDispatch = useContext(TimeDispatchContext);

	useEffect(() => {
		window.onresize = () => viewportDispatch({ type: "UPDATE" });
		return () => window.onresize = null;
	}, []);

	/* Subscribes to market on component mount and unsubscribes on unmount. */
	useEffect(() => {
		subscribeToMarket(marketDispatch);
		return () => unsubscribeFromMarket(marketDispatch);
	}, []);

	/* Updates time managed by reducer. */
	useEffect(() => {
		const timer = window.setInterval(() => timeDispatch({ type: "UPDATE" }), 100);
		return () => window.clearInterval(timer);
	}, []);

	return <WithStyle/>;
};

export default WithDynamicContext;