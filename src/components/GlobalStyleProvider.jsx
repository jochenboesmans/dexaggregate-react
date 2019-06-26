import React, { lazy, useContext, useEffect } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Paper from "@material-ui/core/Paper/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";

import { subscribeToSocketBroadcasts, unsubscribeFromSocketBroadcasts } from "../websocketclient";

import { darkTheme, lightTheme } from "../themes/App";

import {
	LightBulbStateContext,
	ViewportStateContext,
	ViewportDispatchContext,
	TimeDispatchContext,
	MarketDispatchContext,
} from "../state/contexts/contexts";

const BottomBar = lazy(() => import(`./Footer/BottomBar`));
const Header = lazy(() => import(`./Header/Header`));
const Body = lazy(() => import(`./Body/Body`));

const GlobalStyleProvider = () => {
	const viewportDispatch = useContext(ViewportDispatchContext);
	const marketDispatch = useContext(MarketDispatchContext);
	const timeDispatch = useContext(TimeDispatchContext);
	const lightBulb = useContext(LightBulbStateContext);
	const { width: vw } = useContext(ViewportStateContext);

	useEffect(() => {
		window.onresize = () => viewportDispatch({ type: `UPDATE` });
		return () => window.onresize = null;
	}, []);

	/* Subscribes to market on component mount and unsubscribes on unmount. */
	useEffect(() => {
		subscribeToSocketBroadcasts(marketDispatch);
		return () => unsubscribeFromSocketBroadcasts(marketDispatch);
	}, []);

	/* Updates time managed by reducer. */
	useEffect(() => {
		const timer = window.setInterval(() => timeDispatch({ type: `UPDATE` }), 100);
		return () => window.clearInterval(timer);
	}, []);


	const theme = lightBulb ? lightTheme : darkTheme;
	const mainGridWidth = vw > 1300 ? `50vw` : `95vw`;

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline>
				<Grid
					container
					direction="column"
					alignItems="center"
				>
					<Grid
						container
						direction="column"
						style={{ width: `${mainGridWidth}` }}
						spacing={16}
					>
						<Grid item style={{ height: `1vh`}}>
						</Grid>
						<Paper>
							<Grid item style={{ height: `0.5vh`}}>
							</Grid>
							<Grid item>
								<Grid
									container
									direction="column"
									alignItems="center"
								>
									<Grid item style={{ width: `90%` }}>
										<Header/>
									</Grid>
									<Grid item style={{ height: `0.5vh`}}>
									</Grid>
									<Grid item style={{ width: `90%` }}>
										<Body/>
									</Grid>
									<Grid item style={{ height: `0.5vh`}}>
									</Grid>
									<Grid item style={{ width: `90%` }}>
										<BottomBar/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item style={{ height: `0.5vh`}}>
							</Grid>
						</Paper>
						<Grid item style={{ height: `1vh`}}>
						</Grid>
					</Grid>
				</Grid>
			</CssBaseline>
		</MuiThemeProvider>
	);
};

export default GlobalStyleProvider;