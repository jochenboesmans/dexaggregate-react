import {SET_MARKET, SET_PAGE, SET_EXCHANGES, SET_SEARCH_FILTER} from "./types";
import axios from "axios";
import _ from "lodash";
import {rebaseCombinedVolume} from "../util/marketFunctions";
import io from "socket.io-client";

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