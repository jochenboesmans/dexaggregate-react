import React, {createElement, lazy, Suspense, useContext, FC} from "react";

import {ActivePageStateContext} from "../../state/contexts/contexts";

const componentsByPageID = {
	CURRENCIES: lazy(() => import("./Currencies/Currencies")),
	PAIRS: lazy(() => import("./Pairs/Pairs")),
	EMD: lazy(() => import("./EMDs/EMDs")),
};

const Body: FC = () => {
	const {ID: activePageID} = useContext(ActivePageStateContext);
	return (
		<Suspense fallback={<div>Loading Body...</div>}>
			{createElement(componentsByPageID[activePageID])}
		</Suspense>
	);
};

export default Body;