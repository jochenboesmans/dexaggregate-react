import {SET_MARKET, SET_PAGE, SET_TABLE_PAGE, SET_SEARCH_FILTER} from "./types";

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

export const setTablePage = (tablePage) => dispatch => {
	dispatch({type: SET_TABLE_PAGE, payload: tablePage});
};