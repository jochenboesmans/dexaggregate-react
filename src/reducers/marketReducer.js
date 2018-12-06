import {SET_MARKET} from "../actions/types";

export const defaultMarket = {market: null, exchanges: null, timestamp: null};

export const marketReducer = (state = defaultMarket, action) => {
	switch (action.type) {
		case SET_MARKET:
			return action.payload || defaultMarket;
		default:
			return state;
	}
};