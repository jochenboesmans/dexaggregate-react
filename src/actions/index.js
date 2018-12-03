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
	const sortedMarket = _.orderBy(market, [p => rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ['desc']);
	dispatch({type: SET_MARKET, payload: sortedMarket});
};

export const updateExchanges = (exchanges) => dispatch => {
	dispatch({type: SET_EXCHANGES, payload: exchanges});
};

export const setSearchFilter = (searchFilter) => dispatch => {
	dispatch({type: SET_SEARCH_FILTER, payload: searchFilter});
};