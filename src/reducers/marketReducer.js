import {SET_MARKET} from "../actions/types";

export const marketReducer = (state = null, action) => {
	switch (action.type) {
		case SET_MARKET:
			return action.payload || null;
		default:
			return state;
	}
};