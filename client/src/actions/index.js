import { defaultDeltaY } from "../reducers/deltaYReducer";
import { defaultPage } from "../reducers/navigationReducer";
import { defaultSearchFilter } from "../reducers/searchFilterReducer";
import {
	SET_DELTA_Y,
	SET_MARKET,
	SET_PAGE,
	SET_SEARCH_FILTER,
	UPDATE_TIME,
	UPDATE_VIEWPORT,
} from "./types";

/* Action creator functions */
const setPage = (page) => dispatch => {
	dispatch({ type: SET_PAGE, payload: page });
};

const updateMarket = (market) => dispatch => {
	dispatch({
		type: SET_MARKET, payload: {
			market: market.market,
			exchanges: market.exchanges,
			timestamp: Date.now(),
			lastUpdateExchangeID: market.lastUpdate.exchangeID,
		}
	});
};

const setSearchFilter = (searchFilter) => dispatch => {
	dispatch({ type: SET_SEARCH_FILTER, payload: searchFilter });
};

const setDeltaY = (deltaY) => dispatch => {
	dispatch({ type: SET_DELTA_Y, payload: deltaY });
};

const resetState = () => dispatch => {
	dispatch({ type: SET_SEARCH_FILTER, payload: defaultSearchFilter });
	dispatch({ type: SET_PAGE, payload: defaultPage });
	dispatch({ type: SET_DELTA_Y, payload: defaultDeltaY });
};

const updateTime = () => dispatch => {
	dispatch({ type: UPDATE_TIME });
};

const updateViewport = () => dispatch => {
	const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	dispatch({ type: UPDATE_VIEWPORT, payload: { width: width, height: height}});
};

export {
	setPage,
	updateMarket,
	setSearchFilter,
	setDeltaY,
	resetState,
	updateTime,
	updateViewport
};