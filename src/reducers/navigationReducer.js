import {SET_PAGE} from "../actions/types";
import {pages} from "../model/pages";

export const defaultPage = pages.MARKET;

export const navigationReducer = (state = defaultPage, action) => {
	switch (action.type) {
		case SET_PAGE:
			return action.payload || defaultPage;
		default:
			return state;
	}
};