import React, { lazy, Suspense } from "react";

import Grid from "@material-ui/core/Grid/Grid";

const TitleBar = lazy(() => import(`./TitleBar`));
const MarketInfo = lazy(() => import(`./MarketInfo`));

const Header = () => {
	const components = {
		TitleBar: TitleBar,
		MarketInfo: MarketInfo,
	};

	return (
		<Grid
			container
			direction="column"
			justify="center"
		>
			{Object.entries(components).map(([key, C]) => (
				<Grid item key={key}>
					<Suspense fallback={<div>{`Loading ${key}...`}</div>}>
						<C/>
					</Suspense>
				</Grid>
			))}
		</Grid>
	);
};

export default Header;