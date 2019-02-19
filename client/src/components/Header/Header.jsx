import React from "react";

import Grid from "@material-ui/core/Grid/Grid";

import { TitleBar } from "./TitleBar";
import { TopBar } from "./TopBar";

const Header = () => (
	<Grid
		container
    direction="column"
    justify="center">
	  <Grid item>
	    <TitleBar/>
	  </Grid>
		<Grid item>
			<TopBar/>
		</Grid>
	</Grid>
);

export { Header };