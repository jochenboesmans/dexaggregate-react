import { SET_PAGE } from "../actions/types";
import { pages } from "../model/pages";

const defaultPage = pages.MARKET;

const navigationReducer = (state = defaultPage, action) => {
	switch(action.type) {
		case SET_PAGE:
			return action.payload || defaultPage;
		default:
			return state;
	}
};

export { defaultPage, navigationReducer };