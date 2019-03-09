import React, { lazy, useContext } from "react";

import installMUIstyles from "@material-ui/styles/install";

import { darkTheme, lightTheme } from "../themes/App";

import { LightBulbStateContext, ViewportStateContext } from "../contexts/contexts";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const MuiThemeProvider = lazy(() => import("@material-ui/core/styles/MuiThemeProvider"));
const Paper = lazy(() => import("@material-ui/core/Paper/Paper"));
const CssBaseline = lazy(() => import("@material-ui/core/CssBaseline"));

const BottomBar = lazy(() => import("./Footer/BottomBar"));
const Header = lazy(() => import("./Header/Header"));
const Body = lazy(() => import("./Body/Body"));

/* Temporary solution for usage of alpha version of MUI styles */
installMUIstyles();

const GlobalStyleProvider = () => {
	const lightBulb = useContext(LightBulbStateContext);
	const theme = lightBulb ? lightTheme : darkTheme;
	const { width: vw } = useContext(ViewportStateContext);
	const width = vw > 1300 ? "50vw" : "95vw";

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
							<Grid item>
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
	)
};

export default GlobalStyleProvider;