import React, { lazy } from "react";
import { connect } from "react-redux";

import { darkTheme, lightTheme } from "../themes/App";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const MuiThemeProvider = lazy(() => import("@material-ui/core/styles/MuiThemeProvider"));
const Paper = lazy(() => import("@material-ui/core/Paper/Paper"));
const CssBaseline = lazy(() => import("@material-ui/core/CssBaseline"));

const BottomBar = lazy(() => import("./Footer/BottomBar"));
const Header = lazy(() => import("./Header/Header"));
const Body = lazy(() => import("./Body/Body"));

const unconnectedApp = ({ viewport, lightBulb }) => {
	const vw = viewport.width || Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const width = vw > 1300 ? "50vw" : "95vw";
	const theme = lightBulb === `DARK` ? darkTheme : lightTheme;

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
						style={{ width: `${width}` }}
						spacing={16}
					>
						<Grid item style={{ height: "2.5vh"}}>
						</Grid>
						<Paper>
						<Grid item style={{ height: "1vh"}}>
						</Grid>
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
						<Grid item style={{ height: "1vh"}}>
						</Grid>
						</Paper>
						<Grid item style={{ height: "1vh"}}>
						</Grid>
					</Grid>
				</Grid>
			</CssBaseline>
		</MuiThemeProvider>
	);
};

const App = connect(({ viewport, lightBulb }) => ({ viewport, lightBulb }))(unconnectedApp);
export default App;
