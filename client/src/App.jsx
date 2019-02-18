
import React from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { updateViewport } from "./actions";

import * as actions from "./actions";

import { BottomBar } from "./components/Footer/BottomBar";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { TopBar } from "./components/Main/Market/TopBar";

import { theme } from "./themes/App";

const unconnectedApp = ({ updateTime, updateViewport, viewport }) => {
	setInterval(() => updateTime(), 100);

	window.onresize = () => updateViewport();

	const initialVW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const initialVH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	const vw = viewport.width || initialVW;
	const vh = viewport.height || initialVH;

	const width = vw > 1300 ? "50vw" : "95vw";
	const heights = ["12vh", "18vh", "60vh", "10vh"];
	const heights2 = ["17.5vh", "72.5vh", "10vh"];

	if (vh < 960) {
		return (
			<MuiThemeProvider theme={theme}>
				<Grid
					container
					direction="column"
					alignItems="center"
				>
					<>
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
								<TopBar/>
							</Grid>
							<Grid item>
								<Main/>
							</Grid>
							<Grid item>
								<BottomBar/>
							</Grid>
						</Grid>
					</>
				</Grid>
			</MuiThemeProvider>
		)
	}
	return (
		<MuiThemeProvider theme={theme}>
			<Grid
				container
				direction="column"
				alignItems="center"
			>
				<>
					<Grid
						container
						direction="column"
						style={{ width: `${width}` }}
					>
						<Grid item style={{ height: `${heights[0]}` }}>
							<Header/>
						</Grid>
						<Grid item style={{ height: `${heights[1]}` }}>
							<TopBar/>
						</Grid>
						<Grid item style={{ height: `${heights[2]}` }}>
							<Main/>
						</Grid>
						<Grid item style={{ height: `${heights[3]}` }}>
							<BottomBar/>
						</Grid>
					</Grid>
				</>
			</Grid>
		</MuiThemeProvider>
	);
};

const App = connect(({viewport}) => ({viewport}), actions)(unconnectedApp);
export { App };
