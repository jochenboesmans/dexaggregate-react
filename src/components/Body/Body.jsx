import React, { lazy, Suspense, useReducer } from "react";

import { ActivePageDispatchContext, ActivePageStateContext } from "../../contexts/contexts";
import { activePageReducer } from "../../reducers/reducers";

const Market = lazy(() => import("./Market/Market"));
const Pair = lazy(() => import("./Pair/Pair"));

const Body = () => {
	const [activePageState, activePageDispatch] = useReducer(activePageReducer, { ID: `MARKET`, pair: null });
	const componentsByPageID = {
		MARKET: <Market/>,
		PAIR: <Pair/>,
	};
	return (
		<ActivePageDispatchContext.Provider value={activePageDispatch}>
			<ActivePageStateContext.Provider value={activePageState}>
				<Suspense fallback={<div>Loading...</div>}>
					{componentsByPageID[activePageState]}
				</Suspense>
			</ActivePageStateContext.Provider>
		</ActivePageDispatchContext.Provider>
	);
};

export default Body;