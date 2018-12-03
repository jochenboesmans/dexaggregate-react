import {SET_EXCHANGES} from "../actions/types";

export const exchangeReducer = (state = null, action) => {
	switch (action.type) {
		case SET_EXCHANGES:
			return action.payload || null;
		default:
			return state;
	}
};