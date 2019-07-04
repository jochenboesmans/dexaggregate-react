import React, {useReducer, FC} from "react";

import {
	lightBulbReducer, viewportReducer, marketReducer, timeReducer, activePageReducer, marketPageReducer, searchFilterReducer,
	currenciesPageReducer,
} from "../state/reducers/reducers";

import {
	LightBulbDispatchContext, LightBulbStateContext,
	ViewportDispatchContext, ViewportStateContext,
	TimeStateContext, TimeDispatchContext,
	MarketStateContext, MarketDispatchContext,
	ActivePageStateContext, ActivePageDispatchContext,
	MarketPageStateContext, MarketPageDispatchContext,
	SearchFilterDispatchContext, SearchFilterStateContext,
	CurrenciesPageStateContext, CurrenciesPageDispatchContext,
} from "../state/contexts/contexts";

import WithDynamicContext from "./WithDynamicContext";

const WithContext: FC = () => {
	const initialViewport = {
		width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	};

	const initialMarket = { market: [], exchanges: [], lastUpdate: null };

	const [lightBulbState, lightBulbDispatch] = useReducer(lightBulbReducer, false);
	const [viewportState, viewportDispatch] = useReducer(viewportReducer, initialViewport);
	const [marketState, marketDispatch] = useReducer(marketReducer, initialMarket);
	const [timeState, timeDispatch] = useReducer(timeReducer, Date.now());
	const [activePageState, activePageDispatch] = useReducer(activePageReducer, { ID: "CURRENCIES", currency: null, pair: null });
	const [marketPageState, marketPageDispatch] = useReducer(marketPageReducer, 0);
	const [searchFilterState, searchFilterDispatch] = useReducer(searchFilterReducer, "");
	const [currenciesPageState, currenciesPageDispatch] = useReducer(currenciesPageReducer, 0);

	return (
		<LightBulbDispatchContext.Provider value={lightBulbDispatch}>
			<LightBulbStateContext.Provider value={lightBulbState}>
				<ViewportDispatchContext.Provider value={viewportDispatch}>
					<ViewportStateContext.Provider value={viewportState}>
						<MarketDispatchContext.Provider value={marketDispatch}>
							<MarketStateContext.Provider value={marketState}>
								<TimeDispatchContext.Provider value={timeDispatch}>
									<TimeStateContext.Provider value={timeState}>
										<ActivePageDispatchContext.Provider value={activePageDispatch}>
											<ActivePageStateContext.Provider value={activePageState}>
												<MarketPageDispatchContext.Provider value={marketPageDispatch}>
													<MarketPageStateContext.Provider value={marketPageState}>
														<CurrenciesPageDispatchContext.Provider value={currenciesPageDispatch}>
															<CurrenciesPageStateContext.Provider value={currenciesPageState}>
																<SearchFilterDispatchContext.Provider value={searchFilterDispatch}>
																	<SearchFilterStateContext.Provider value={searchFilterState}>
																		<WithDynamicContext/>
																	</SearchFilterStateContext.Provider>
																</SearchFilterDispatchContext.Provider>
															</CurrenciesPageStateContext.Provider>
														</CurrenciesPageDispatchContext.Provider>
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

export default WithContext;