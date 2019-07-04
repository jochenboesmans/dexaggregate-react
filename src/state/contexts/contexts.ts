import { createContext } from "react";

const LightBulbDispatchContext = createContext(null);
const LightBulbStateContext = createContext(null);

const ViewportDispatchContext = createContext(null);
const ViewportStateContext = createContext(null);

const MarketDispatchContext = createContext(null);
const MarketStateContext = createContext(null);

const TimeDispatchContext = createContext(null);
const TimeStateContext = createContext(null);

const MarketPageDispatchContext = createContext(null);
const MarketPageStateContext = createContext(null);

const SearchFilterDispatchContext = createContext(null);
const SearchFilterStateContext = createContext(null);

const ActivePageDispatchContext = createContext(null);
const ActivePageStateContext = createContext(null);

const CurrenciesPageDispatchContext = createContext(null);
const CurrenciesPageStateContext = createContext(null);

export {
	LightBulbStateContext,
	LightBulbDispatchContext,
	ViewportStateContext,
	ViewportDispatchContext,
	MarketStateContext,
	MarketDispatchContext,
	TimeDispatchContext,
	TimeStateContext,
	MarketPageDispatchContext,
	MarketPageStateContext,
	SearchFilterDispatchContext,
	SearchFilterStateContext,
	ActivePageStateContext,
	ActivePageDispatchContext,
	CurrenciesPageDispatchContext,
	CurrenciesPageStateContext,
};