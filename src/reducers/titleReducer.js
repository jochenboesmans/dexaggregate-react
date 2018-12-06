import {SET_TITLE} from "../actions/types";

export const defaultTitle = "ΣDEX";

export const titleReducer = (state = defaultTitle, action) => {
	switch (action.type) {
		case SET_TITLE:
			return action.payload || defaultTitle;
		default:
			return state;
	}
};