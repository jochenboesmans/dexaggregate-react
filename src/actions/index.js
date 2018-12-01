import {SET_MARKET, SET_PAGE, SET_EXCHANGES} from "./types";
import axios from "axios";
import _ from "lodash";
import {rebaseCombinedVolume} from "../util/marketFunctions";

/* Action creator functions
 */
export const setPage = (page) => dispatch => {
	dispatch({type: SET_PAGE, payload: page});
};

export const updateMarket = () => async dispatch => {
	const market = (await axios.get("/api/market")).data;
	const sortedMarket = _.orderBy(market, [p => rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ['desc']);
	dispatch({type: SET_MARKET, payload: sortedMarket});
};

export const updateExchanges = () => async dispatch => {
	const exchanges = (await axios.get("/api/exchanges")).data;
	dispatch({type: SET_EXCHANGES, payload: exchanges});
};