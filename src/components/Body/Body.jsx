import React, { lazy, Suspense, useContext } from "react";

import { ActivePageStateContext } from "../../state/contexts/contexts";

const Market = lazy(() => import(`./Market/Market`));
const Pair = lazy(() => import(`./Pair/Pair`));

const Body = () => {
	const activePageState = useContext(ActivePageStateContext);
	const componentsByPageID = {
		MARKET: <Market/>,
		PAIR: <Pair/>,
	};
	return (
		<Suspense fallback={<div>Loading...</div>}>
			{componentsByPageID[activePageState.ID]}
		</Suspense>
	);
};

export default Body;