import React, { lazy, useReducer, Suspense } from "react";

import {
	lightBulbReducer, viewportReducer, marketReducer, timeReducer, activePageReducer, marketPageReducer, searchFilterReducer,
} from "../state/reducers/reducers";

import {
	LightBulbDispatchContext, LightBulbStateContext,
	ViewportDispatchContext, ViewportStateContext,
	TimeStateContext, TimeDispatchContext,
	MarketStateContext, MarketDispatchContext,
	ActivePageStateContext, ActivePageDispatchContext,
	MarketPageStateContext, MarketPageDispatchContext,
	SearchFilterDispatchContext, SearchFilterStateContext,
} from "../state/contexts/contexts";

const GlobalStyleProvider = lazy(() => import(`./GlobalStyleProvider`));

const GlobalContextProvider = () => {
	const initialViewport = {
		width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	};

	const initialMarket = {
		market: [], exchanges: [], lastUpdate: null,
	};

	const [lightBulb, lightBulbDispatch] = useReducer(lightBulbReducer, false);
	const [viewport, viewportDispatch] = useReducer(viewportReducer, initialViewport);
	const [marketState, marketDispatch] = useReducer(marketReducer, initialMarket);
	const [timeState, timeDispatch] = useReducer(timeReducer, Date.now());
	const [activePageState, activePageDispatch] = useReducer(activePageReducer, { ID: `MARKET`, pair: null });
	const [marketPage, marketPageDispatch] = useReducer(marketPageReducer, 0);
	const [searchFilter, searchFilterDispatch] = useReducer(searchFilterReducer, ``);

	return (
		<LightBulbDispatchContext.Provider value={lightBulbDispatch}>
			<LightBulbStateContext.Provider value={lightBulb}>
				<ViewportDispatchContext.Provider value={viewportDispatch}>
					<ViewportStateContext.Provider value={viewport}>
						<MarketDispatchContext.Provider value={marketDispatch}>
							<MarketStateContext.Provider value={marketState}>
								<TimeDispatchContext.Provider value={timeDispatch}>
									<TimeStateContext.Provider value={timeState}>
										<ActivePageDispatchContext.Provider value={activePageDispatch}>
											<ActivePageStateContext.Provider value={activePageState}>
												<MarketPageDispatchContext.Provider value={marketPageDispatch}>
													<MarketPageStateContext.Provider value={marketPage}>
														<SearchFilterDispatchContext.Provider value={searchFilterDispatch}>
															<SearchFilterStateContext.Provider value={searchFilter}>
																<Suspense fallback={<div>Loading GlobalStyleProvider...</div>}>
																	<GlobalStyleProvider/>
																</Suspense>
															</SearchFilterStateContext.Provider>
														</SearchFilterDispatchContext.Provider>
													</MarketPageStateContext.Provider>
												</MarketPageDispatchContext.Provider>
											</ActivePageStateContext.Provider>
										</ActivePageDispatchContext.Provider>
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