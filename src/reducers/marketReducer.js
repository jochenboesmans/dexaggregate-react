import { SET_MARKET } from "../actions/types";

const defaultMarket = {
	market: null, exchanges: null, timestamp: null, lastUpdateExchangeID: null,
};

const marketReducer = (state = defaultMarket, action) => {
	switch(action.type) {
		case SET_MARKET:
			return action.payload || defaultMarket;
		default:
			return state;
	}
};

export { defaultMarket, marketReducer };