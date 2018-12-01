import {combineReducers} from 'redux';
import {navigationReducer} from './navigationReducer';
import {marketReducer} from "./marketReducer";
import {exchangeReducer} from "./exchangeReducer";

export default combineReducers({
	activePage: navigationReducer,
	market: marketReducer,
	exchanges: exchangeReducer
});