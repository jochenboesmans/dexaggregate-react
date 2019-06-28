import React, { createElement, lazy, Suspense, useContext, FC } from "react";

import { ActivePageStateContext } from "../../state/contexts/contexts";

const componentsByPageID = {
	MARKET: lazy(() => import(`./Market/Market`)),
	PAIR: lazy(() => import(`./Pair/Pair`)),
};

const Body: FC = () => {
	const activePageState = useContext(ActivePageStateContext);
	return (
		<Suspense fallback={<div>Loading Body...</div>}>
			{createElement(componentsByPageID[activePageState.ID])}
		</Suspense>
	);
};

export default Body;