import { UPDATE_TIME } from "../actions/types";

const defaultTime = Date.now();

const timeReducer = (state = defaultTime, action) => {
	switch(action.type) {
		case UPDATE_TIME:
			return Date.now() || defaultTime;
		default:
			return state;
	}
};

export { defaultTime, timeReducer };