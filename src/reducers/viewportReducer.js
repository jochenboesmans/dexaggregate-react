import { UPDATE_VIEWPORT } from "../actions/types";

const defaultViewport = { width: 0, height: 0 };

const viewportReducer = (state = defaultViewport, action) => {
	if (action.type === UPDATE_VIEWPORT) {
		return action.payload || defaultViewport;
	} else {
		return defaultViewport;
	}
};

export { viewportReducer, defaultViewport };