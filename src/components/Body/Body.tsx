import React, { createElement, lazy, Suspense, useContext, FC } from "react";

import { ActivePageStateContext } from "../../state/contexts/contexts";

const componentsByPageID = {
	CURRENCIES: lazy(() => import("./Currencies/Currencies")),
	PAIRS: lazy(() => import("./Pairs/Pairs")),
	EMD: lazy(() => import("./Pair/Pair")),
};

const Body: FC = () => {
	const activePageState = useContext(ActivePageStateContext);
	console.log(activePageState.ID);
	return (
		<Suspense fallback={<div>Loading Body...</div>}>
			{createElement(componentsByPageID[activePageState.ID])}
		</Suspense>
	);
};

export default Body;