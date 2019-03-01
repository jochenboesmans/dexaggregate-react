import React, { lazy } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";

import { theme } from "../themes/App";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const MuiThemeProvider = lazy(() => import("@material-ui/core/styles/MuiThemeProvider"));

const BottomBar = lazy(() => import("./Footer/BottomBar"));
const Header = lazy(() => import("./Header/Header"));
const Body = lazy(() => import("./Body/Body"));

const unconnectedApp = ({ updateTime, updateViewport, viewport }) => {
	setInterval(() => updateTime(), 100);

	window.onresize = () => updateViewport();

	const vw = viewport.width || Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	const width = vw > 1300 ? "50vw" : "95vw";
	return (
		<MuiThemeProvider theme={theme}>
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
					<Grid item>
						<Header/>
					</Grid>
					<Grid item>
						<Body/>
					</Grid>
					<Grid item>
						<BottomBar/>
					</Grid>
				</Grid>
			</Grid>
		</MuiThemeProvider>
	);
};

const App = connect(({ viewport }) => ({ viewport }), actions)(unconnectedApp);
export default App;
