import {combineReducers} from 'redux';
import {navigationReducer} from './navigationReducer';
import {marketReducer} from "./marketReducer";
import {searchFilterReducer} from "./searchFilterReducer";
import {tablePageReducer} from "./tablePageReducer";

export default combineReducers({
	activePage: navigationReducer,
	market: marketReducer,
	searchFilter: searchFilterReducer,
	tablePage: tablePageReducer
});