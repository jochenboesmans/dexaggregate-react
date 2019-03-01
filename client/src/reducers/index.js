import { combineReducers } from "redux";

import { deltaYReducer } from "./deltaYReducer";
import { marketReducer } from "./marketReducer";
import { navigationReducer } from "./navigationReducer";
import { searchFilterReducer } from "./searchFilterReducer";
import { timeReducer } from "./timeReducer";
import { viewportReducer } from "./viewportReducer";

const reducer = combineReducers({
	activePage: navigationReducer,
	market: marketReducer,
	searchFilter: searchFilterReducer,
	deltaY: deltaYReducer,
	time: timeReducer,
	viewport: viewportReducer,
});

export { reducer };