import React, { lazy, useState } from "react";
import { connect } from "react-redux";

import { darkTheme, lightTheme } from "../themes/App";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const MuiThemeProvider = lazy(() => import("@material-ui/core/styles/MuiThemeProvider"));
const Paper = lazy(() => import("@material-ui/core/Paper/Paper"));
const CssBaseline = lazy(() => import("@material-ui/core/CssBaseline"));

const BottomBar = lazy(() => import("./Footer/BottomBar"));
const Header = lazy(() => import("./Header/Header"));
const Body = lazy(() => import("./Body/Body"));

const unconnectedApp = ({ viewport }) => {
	const [theme, setTheme] = useState(darkTheme);

	const vw = viewport.width || Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const width = vw > 1300 ? "50vw" : "95vw";

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline>
				<Grid
					container
					direction="column"
					alignItems="center"
				>
					<Paper>
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
					</Paper>
				</Grid>
			</CssBaseline>
		</MuiThemeProvider>
	);
};

const App = connect(({ viewport }) => ({ viewport }))(unconnectedApp);
export default App;
