import {SET_SEARCH_FILTER} from "../actions/types";

export const searchFilterReducer = (state = null, action) => {
	switch (action.type) {
		case SET_SEARCH_FILTER:
			return action.payload || null;
		default:
			return state;
	}
};