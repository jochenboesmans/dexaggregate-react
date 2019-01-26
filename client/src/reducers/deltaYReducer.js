import { SET_DELTA_Y } from "../actions/types";

const defaultDeltaY = 0;

const deltaYReducer = (state = defaultDeltaY, action) => {
	switch (action.type) {
		case SET_DELTA_Y:
			return action.payload || defaultDeltaY;
		default:
			return state;
	}
};

export { defaultDeltaY, deltaYReducer };