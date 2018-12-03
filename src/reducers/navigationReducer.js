import {SET_PAGE} from "../actions/types";

import {pages} from "../model/pages";

export const navigationReducer = (state = pages.MAIN, action) => {
	switch (action.type) {
		case SET_PAGE:
			return action.payload || pages.MAIN;
		default:
			return state;
	}
};