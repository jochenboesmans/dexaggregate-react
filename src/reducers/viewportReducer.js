import { UPDATE_VIEWPORT } from "../actions/types";

const defaultViewport = { width: 0, height: 0 };

const viewportReducer = (state = defaultViewport, action) => {
	switch(action.type) {
		case UPDATE_VIEWPORT:
			return action.payload || defaultViewport;
		default:
			return defaultViewport;
	}
};

export { viewportReducer, defaultViewport };