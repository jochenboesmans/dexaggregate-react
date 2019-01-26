import { SET_MARKET, SET_PAGE, SET_SEARCH_FILTER, SET_DELTA_Y } from "./types";
import { defaultSearchFilter } from "../reducers/searchFilterReducer";
import { defaultPage } from "../reducers/navigationReducer";
import { defaultDeltaY } from "../reducers/deltaYReducer";

/* Action creator functions */
const setPage = (page) => dispatch => {
	dispatch({ type: SET_PAGE, payload: page });
};

const updateMarket = (market) => dispatch => {
	dispatch({ type: SET_MARKET, payload: {
		market: market.market,
		exchanges: market.exchanges,
		timestamp: market.timestamp,
	}});
};

const setSearchFilter = (searchFilter) => dispatch => {
	dispatch({ type: SET_SEARCH_FILTER, payload: searchFilter });
};

const setDeltaY = (deltaY) => dispatch => {
	dispatch({ type: SET_DELTA_Y, payload: deltaY })
};

const resetState = () => dispatch => {
	dispatch({ type: SET_SEARCH_FILTER, payload: defaultSearchFilter });
	dispatch({ type: SET_PAGE, payload: defaultPage });
	dispatch({ type: SET_DELTA_Y, payload: defaultDeltaY });
};

export { setPage, updateMarket, setSearchFilter, setDeltaY, resetState };