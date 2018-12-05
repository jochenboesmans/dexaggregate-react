import {SET_TABLE_PAGE} from "../actions/types";

export const tablePageReducer = (state = 0, action) => {
	switch (action.type) {
		case SET_TABLE_PAGE:
			return action.payload || 0;
		default:
			return state;
	}
};