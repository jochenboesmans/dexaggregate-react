import { combineReducers } from "redux";
import { deltaYReducer } from "./deltaYReducer";
import { marketReducer } from "./marketReducer";
import { navigationReducer } from "./navigationReducer";
import { searchFilterReducer } from "./searchFilterReducer";

const reducer = combineReducers({
	                                activePage: navigationReducer,
	                                market: marketReducer,
	                                searchFilter: searchFilterReducer,
	                                deltaY: deltaYReducer
                                });

export { reducer };