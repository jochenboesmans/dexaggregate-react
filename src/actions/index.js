import {SET_MARKET, SET_PAGE, SET_SEARCH_FILTER, SET_DELTA_Y} from "./types";
import {defaultSearchFilter} from "../reducers/searchFilterReducer";
import {defaultPage} from "../reducers/navigationReducer";
import {defaultDeltaY} from "../reducers/deltaYReducer";

/* Action creator functions
 */
export const setPage = (page) => dispatch => {
	dispatch({type: SET_PAGE, payload: page});
};

export const updateMarket = (market) => dispatch => {
	dispatch({type: SET_MARKET, payload: {market: market.market, exchanges: market.exchanges, timestamp: market.timestamp}});
};

export const setSearchFilter = (searchFilter) => dispatch => {
	dispatch({type: SET_SEARCH_FILTER, payload: searchFilter});
};

export const setDeltaY = (deltaY) => dispatch => {
	dispatch({type: SET_DELTA_Y, payload: deltaY})
};

export const resetState = () => dispatch => {
	console.log("resetstate");
	dispatch({type: SET_SEARCH_FILTER, payload: defaultSearchFilter});
	dispatch({type: SET_PAGE, payload: defaultPage});
	dispatch({type: SET_DELTA_Y, payload: defaultDeltaY});
};