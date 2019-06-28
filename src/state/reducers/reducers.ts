const lightBulbReducer = (state, action) => {
	if (action.type === `SWITCH`) {
		return !state;
	} else {
		throw new Error(`Incorrect action.type`);
	}
};

const viewportReducer = (state, action) => {
	if (action.type === `UPDATE`) {
		return {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		};
	} else {
		throw new Error(`Incorrect action.type`);
	}
};

const marketReducer = ({market: m, exchanges: e, lastUpdate: l}, action) => {
	if (action.type === `SET_MARKET`) {
		return {
			market: action.payload,
			exchanges: e,
			lastUpdate: l,
		};
	} else if (action.type === `SET_EXCHANGES`) {
		return {
			market: m,
			exchanges: action.payload,
			lastUpdate: l,
		};
	} else if (action.type === `SET_LAST_UPDATE`) {
		return {
			market: m,
			exchanges: e,
			lastUpdate: action.payload,
		};
	} else {
		throw new Error(`Incorrect action.type`);
	}
};

const timeReducer = (state, action) => {
	if (action.type === `UPDATE`) {
		return Date.now();
	} else {
		throw new Error(`Incorrect action.type`);
	}
};

const marketPageReducer = (state, action) => {
	if (action.type === `INCREMENT`) {
		return state + 1;
	} else if (action.type === `DECREMENT`) {
		return state - 1;
	} else if (action.type === `RESET`) {
		return 0;
	} else {
		throw new Error(`Incorrect action.type`);
	}
};

const searchFilterReducer = (state, action) => {
	if (action.type === `SET`) {
		return action.payload;
	} else if (action.type === `RESET`) {
		return ``;
	} else {
		throw new Error(`Incorrect action.type`);
	}
};


const activePageReducer = (state, action) => {
	const defaultPage = { ID: `MARKET`, pair: null };
	if (action.type === `SET`) {
		return action.payload;
	} else if (action.type === `RESET`) {
		return defaultPage;
	} else {
		throw new Error(`Incorrect action.type`);
	}
};

export {
	viewportReducer,
	timeReducer,
	lightBulbReducer,
	marketReducer,
	marketPageReducer,
	searchFilterReducer,
	activePageReducer,
};