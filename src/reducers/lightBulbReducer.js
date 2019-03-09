import { SWITCH_LIGHT_BULB } from "../actions/types";

const states = {
	DARK: `DARK`,
	LIGHT: `LIGHT`,
};
const defaultState = states.DARK;

const switchLight = {
	DARK: `LIGHT`,
	LIGHT: `DARK`,
};

const lightBulbReducer = (state = defaultState, action) => {
	switch(action.type) {
	case SWITCH_LIGHT_BULB:
		return switchLight[state];
	default:
		return state;
	}
};

export { lightBulbReducer };