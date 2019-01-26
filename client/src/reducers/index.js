import { combineReducers } from "redux";
import { navigationReducer } from "./navigationReducer";
import { marketReducer } from "./marketReducer";
import { searchFilterReducer } from "./searchFilterReducer";
import { deltaYReducer } from "./deltaYReducer";

const reducer = combineReducers({
	activePage: navigationReducer,
	market: marketReducer,
	searchFilter: searchFilterReducer,
	deltaY: deltaYReducer
});

export { reducer };