import React, { createContext, lazy, useReducer } from "react";
//import { connect } from "react-redux";
import installMUIstyles from "@material-ui/styles/install";

import { darkTheme, lightTheme } from "../themes/App";

const MuiThemeProvider = lazy(() => import("@material-ui/core/styles/MuiThemeProvider"));
const Paper = lazy(() => import("@material-ui/core/Paper/Paper"));
const CssBaseline = lazy(() => import("@material-ui/core/CssBaseline"));

/* Temporary solution for usage of alpha version of MUI styles */
installMUIstyles();

const LightBulbDispatchContext = createContext(null);
const LightBulbStateContext = createContext(null);

const lightBulbReducer = (state, action) => {
	if (action.type === `SWITCH`) {
		return !state;
	} else {
		throw new Error();
	}
};

const ViewportDispatchContext = createContext(null);
const ViewportStateContext = createContext(null);

const viewportReducer = (state, action) => {
	if (action.type === `UPDATE`) {
		return {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		};
	} else {
		throw new Error();
	}
};

const initialViewport = {
	width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
};

const App = () => {
	const [lightBulbState, lightBulbDispatch] = useReducer(lightBulbReducer, false);
	const [viewportState, viewportDispatch] = useReducer(viewportReducer, initialViewport);

	const vw = viewportState.width;
	const width = vw > 1300 ? "50vw" : "95vw";
	const theme = lightBulbState ? lightTheme : darkTheme;

	return (
		<LightBulbDispatchContext.Provider value={lightBulbDispatch}>
			<LightBulbStateContext.Provider value={lightBulbState}>
				<ViewportDispatchContext.Provider value={viewportDispatch}>
					<ViewportStateContext.Provider value={viewportState}>
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
										style={{ width: `${width}` }}
										spacing={16}
									>
										<Grid item style={{ height: "2.5vh"}}>
										</Grid>
										<Paper>
											<Grid item style={{ height: "1vh"}}>
											</Grid>
												<Main/>
											<Grid item style={{ height: "1vh"}}>
											</Grid>
										</Paper>
										<Grid item style={{ height: "1vh"}}>
										</Grid>
									</Grid>
								</Grid>
							</CssBaseline>
						</MuiThemeProvider>
					</ViewportStateContext.Provider>
				</ViewportDispatchContext.Provider>
			</LightBulbStateContext.Provider>
		</LightBulbDispatchContext.Provider>
	);
};

//const App = connect(({ viewport, lightBulb }) => ({ viewport, lightBulb }))(unconnectedApp);
export default App;
export {
	LightBulbDispatchContext,
	LightBulbStateContext,
	ViewportDispatchContext,
	ViewportStateContext
};
