import {SET_TABLE_PAGE} from "../actions/types";

const defaultTablePage = 0;
export const tablePageReducer = (state = defaultTablePage, action) => {
	switch (action.type) {
		case SET_TABLE_PAGE:
			return action.payload || defaultTablePage;
		default:
			return state;
	}
};