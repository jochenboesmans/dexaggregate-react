import {combineReducers} from 'redux';
import {navigationReducer} from './navigationReducer';
import {marketReducer} from "./marketReducer";
import {searchFilterReducer} from "./searchFilterReducer";
import {tablePageReducer} from "./tablePageReducer";
import {titleReducer} from "./titleReducer";
import {deltaYReducer} from "./deltaYReducer";

export default combineReducers({
	activePage: navigationReducer,
	market: marketReducer,
	searchFilter: searchFilterReducer,
	tablePage: tablePageReducer,
	title: titleReducer,
	deltaY: deltaYReducer
});