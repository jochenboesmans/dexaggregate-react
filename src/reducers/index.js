import {combineReducers} from 'redux';
import {navigationReducer} from './navigationReducer';
import {marketReducer} from "./marketReducer";
import {exchangeReducer} from "./exchangeReducer";
import {searchFilterReducer} from "./searchFilterReducer";

export default combineReducers({
	activePage: navigationReducer,
	market: marketReducer,
	exchanges: exchangeReducer,
	searchFilter: searchFilterReducer
});