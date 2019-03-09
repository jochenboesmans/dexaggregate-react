import React, { createContext, lazy, useEffect, useReducer } from "react";
import { subscribeToSocketBroadcasts, unsubscribeFromSocketBroadcasts } from "src/websocketclient";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));

const BottomBar = lazy(() => import("./Footer/BottomBar"));
const Header = lazy(() => import("./Header/Header"));
const Body = lazy(() => import("./Body/Body"));

const MarketDispatchContext = createContext(null);
const MarketStateContext = createContext(null);

const marketReducer = (state, action) => {
	if (action.type === `UPDATE`) {
		return action.payload;
	} else {
		throw new Error();
	}
};

const TimeDispatchContext = createContext(null);
const TimeStateContext = createContext(null);

const timeReducer = (state, action) => {
	if (action.type === `UPDATE`) {
		return Date.now();
	} else {
		throw new Error();
	}
};

const Main = () => {
	const [marketState, marketDispatch] = useReducer(marketReducer, null);

	/* Subscribes to market on component mount and unsubscribes on unmount. */
	useEffect(() => {
		subscribeToSocketBroadcasts(marketDispatch);
		return () => {
			unsubscribeFromSocketBroadcasts();
		}
	}, []);

	const [timeState, timeDispatch] = useReducer(timeReducer, Date.now());

	useEffect(() => {
		setInterval(() => {

		})
	})

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
		>
			<Grid item style={{ width: "90%" }}>
				<Header/>
			</Grid>
			<Grid item style={{ height: "1.5vh"}}>
			</Grid>
			<Grid item style={{ width: "90%" }}>
				<Body/>
			</Grid>
			<Grid item style={{ height: "1.5vh"}}>
			</Grid>
			<Grid item style={{ width: "90%" }}>
				<BottomBar/>
			</Grid>
		</Grid>
	)
};

export default Main;