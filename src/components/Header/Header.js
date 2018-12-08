import React from "react";

import Grid from "@material-ui/core/Grid/Grid";

import TitleBar from "./TitleBar";
import MarketInformation from "./MarketInformation";

const Header = () => {
	return (
		<Grid container
			  direction="column" justify="center">
			<TitleBar />
			<MarketInformation/>
		</Grid>
	)
};

export default Header;