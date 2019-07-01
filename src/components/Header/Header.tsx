import React, { Suspense, FC, lazy } from "react";

import Grid from "@material-ui/core/Grid/Grid";

const subComponents = {
	Title: lazy(() => import("./Title")),
	MarketInfo: lazy(() => import("./MarketInfo"))
};

const Header: FC = () => (
	<Grid container direction="column" justify="center">
		{Object.entries(subComponents).map(([componentName, MyComponent]) => (
			<Grid item key={componentName}>
				<Suspense fallback={<div>{`Loading ${componentName}...`}</div>}>
					<MyComponent/>
				</Suspense>
			</Grid>
		))}
	</Grid>
);

export default Header;