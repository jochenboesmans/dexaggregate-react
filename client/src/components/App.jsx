import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import * as actions from "../actions";

import { BottomBar } from "./Footer/BottomBar";
import { Header } from "./Header/Header";
import { Body } from "./Body/Body";

import { theme } from "../themes/App";

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
export { App };
