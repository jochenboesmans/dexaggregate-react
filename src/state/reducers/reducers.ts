import {Exchanges, LastUpdate, Pair} from "../../types/market";

export type LightBulbState = boolean;
export type LightBulbAction = {type: "SWITCH"};
type LightBulbReducer = (state: LightBulbState, action: LightBulbAction) => LightBulbState;
export const lightBulbReducer: LightBulbReducer = (state, action) => {
	if (action.type === "SWITCH") {
		return !state;
	} else {
		throw new Error("Incorrect action.type");
	}
};

export type ViewportState = { width: number, height: number };
export type ViewportAction = {type: "UPDATE"};
type ViewportReducer = (state: ViewportState, action: ViewportAction) => ViewportState;
export const viewportReducer: ViewportReducer = (state, action) => {
	if (action.type === "UPDATE") {
		return {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		};
	} else {
		throw new Error("Incorrect action.type");
	}
};

export type MarketState = { market: Array<Pair>, exchanges: Exchanges, lastUpdate: LastUpdate };
export type MarketAction =
	{type: "SET_MARKET", payload: Array<Pair>} |
	{type: "SET_EXCHANGES", payload: Exchanges} |
	{type: "SET_LAST_UPDATE", payload: LastUpdate};
type MarketReducer = (state: MarketState, action: MarketAction) => MarketState;
export const marketReducer: MarketReducer = ({market: m, exchanges: e, lastUpdate: l}, action) => {
	switch (action.type) {
		case "SET_MARKET":
			return {
				market: action.payload,
				exchanges: e,
				lastUpdate: l,
			};
		case "SET_EXCHANGES":
			return {
				market: m,
				exchanges: action.payload,
				lastUpdate: l,
			};
		case "SET_LAST_UPDATE":
			return {
				market: m,
				exchanges: e,
				lastUpdate: action.payload,
			};
		default:
			throw new Error("Incorrect action.type");
	}
};

export type TimeState = number;
export type TimeAction = {type: "UPDATE"}
type TimeReducer = (state: TimeState, action: TimeAction) => TimeState;
export const timeReducer: TimeReducer = (state, action) => {
	if (action.type === "UPDATE") {
		return Date.now();
	} else {
		throw new Error("Incorrect action.type");
	}
};

export type MarketPageState = number;
export type MarketPageAction =
	{type: "INCREMENT"} |
	{type: "DECREMENT"} |
	{type: "RESET"}
type MarketPageReducer = (state: MarketPageState, action: MarketPageAction) => MarketPageState;
export const marketPageReducer: MarketPageReducer = (state, action) => {
	switch (action.type) {
		case "INCREMENT": return state + 1;
		case "DECREMENT": return state - 1;
		case "RESET": return 0;
		default: throw new Error("Incorrect action.type");
	}
};

export type SearchFilterState = string;
export type SearchFilterAction =
	{type: "SET", payload: string} |
	{type: "RESET"}
type SearchFilterReducer = (state: SearchFilterState, action: SearchFilterAction) => SearchFilterState;
export const searchFilterReducer: SearchFilterReducer = (state, action) => {
	switch (action.type) {
		case "SET": return action.payload;
		case "RESET": return "";
		default: throw new Error("Incorrect action.type");
	}
};

export type ActivePageState = { ID: string, pair: Pair | null}
export type ActivePageAction =
	{type: "SET", payload: ActivePageState} |
	{type: "RESET"}
type ActivePageReducer = (state: ActivePageState, action: ActivePageAction) => ActivePageState;
export const activePageReducer: ActivePageReducer = (state, action) => {
	const defaultPage = { ID: "MARKET", pair: null };
	switch (action.type) {
		case "SET": return action.payload;
		case "RESET": return defaultPage;
		default: throw new Error("Incorrect action.type");
	}
};