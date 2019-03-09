import React, { lazy } from "react";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));

const TitleBar = lazy(() => import("./TitleBar"));
const MarketInfo = lazy(() => import("./MarketInfo"));

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
			<MarketInfo/>
		</Grid>
	</Grid>
);

export default Header;