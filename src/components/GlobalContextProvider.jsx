import React, { lazy, useEffect, useReducer } from "react";

import { subscribeToSocketBroadcasts, unsubscribeFromSocketBroadcasts } from "../websocketclient";

import {
	lightBulbReducer,
	viewportReducer,
	marketReducer,
	timeReducer,
} from "../reducers/reducers";

import {
	LightBulbDispatchContext,
	LightBulbStateContext,
	ViewportDispatchContext,
	ViewportStateContext,
	MarketDispatchContext,
	MarketStateContext,
	TimeStateContext,
	TimeDispatchContext,
} from "../contexts/contexts";

const GlobalStyleProvider = lazy(() => import("./GlobalStyleProvider"));

const GlobalContextProvider = () => {
	const initialViewport = {
		width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	};

	const [lightBulb, lightBulbDispatch] = useReducer(lightBulbReducer, false);
	const [viewport, viewportDispatch] = useReducer(viewportReducer, initialViewport);
	const [marketState, marketDispatch] = useReducer(marketReducer, null);
	const [timeState, timeDispatch] = useReducer(timeReducer, Date.now());

	useEffect(() => {
		window.onresize = () => viewportDispatch({ type: `UPDATE` });
	}, []);

	/* Subscribes to market on component mount and unsubscribes on unmount. */
	useEffect(() => {
		subscribeToSocketBroadcasts(marketDispatch);
		return () => unsubscribeFromSocketBroadcasts();
	}, []);

	/* Updates time managed by reducer. */
	useEffect(() => {
		setInterval(() => timeDispatch({ type: `UPDATE` }), 100);
	});

	return (
		<LightBulbDispatchContext.Provider value={lightBulbDispatch}>
			<LightBulbStateContext.Provider value={lightBulb}>
				<ViewportDispatchContext.Provider value={viewportDispatch}>
					<ViewportStateContext.Provider value={viewport}>
						<MarketDispatchContext.Provider value={marketDispatch}>
							<MarketStateContext.Provider value={marketState}>
								<TimeDispatchContext.Provider value={timeDispatch}>
									<TimeStateContext.Provider value={timeState}>
										<GlobalStyleProvider/>
									</TimeStateContext.Provider>
								</TimeDispatchContext.Provider>
							</MarketStateContext.Provider>
						</MarketDispatchContext.Provider>
					</ViewportStateContext.Provider>
				</ViewportDispatchContext.Provider>
			</LightBulbStateContext.Provider>
		</LightBulbDispatchContext.Provider>
	);
};

export default GlobalContextProvider;