import {SET_MARKET, SET_PAGE, SET_EXCHANGES} from "./types";
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