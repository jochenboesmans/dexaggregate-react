import {SET_SEARCH_FILTER} from "../actions/types";

const defaultSearchFilter = null;

export const searchFilterReducer = (state = defaultSearchFilter, action) => {
	switch (action.type) {
		case SET_SEARCH_FILTER:
			return action.payload || defaultSearchFilter;
		default:
			return state;
	}
};