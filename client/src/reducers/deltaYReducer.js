import {SET_DELTA_Y} from "../actions/types";

export const defaultDeltaY = 0;

export const deltaYReducer = (state = defaultDeltaY, action) => {
	switch (action.type) {
		case SET_DELTA_Y:
			return action.payload || defaultDeltaY;
		default:
			return state;
	}
};