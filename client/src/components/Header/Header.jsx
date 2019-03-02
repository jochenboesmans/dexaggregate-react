import React, { lazy } from "react";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));

const TitleBar = lazy(() => import("./TitleBar"));
const TopBar = lazy(() => import("./TopBar"));

const Header = () => (
	<Grid
		container
		direction="column"
		justify="center"
	>
		<Grid item>
			<TitleBar/>
		</Grid>
		<Grid item>
			<TopBar/>
		</Grid>
	</Grid>
);

export default Header;