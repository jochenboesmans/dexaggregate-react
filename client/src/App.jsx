import React from "react";

import Grid from "@material-ui/core/Grid";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { BottomBar } from "./components/Footer/BottomBar";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { TopBar } from "./components/TopBar";

import { theme } from "./themes/App";

const App = () => (
	<div className="App">
	  <MuiThemeProvider theme={theme}>
	    <Grid container
	          direction="column"
	          alignItems="center"
	          justify="space-between"
	    >
	      <div>
		      <Grid
			      container
			      direction="column"
			      alignItems="center"
			      justify="space-between"
			      style={{width: "80vw"}}
			      spacing={16}
		      >
			      <Grid item>
				      <TopBar />
			      </Grid>
			      <Grid item>
				      <Header/>
			      </Grid>
			      <Grid item>
				      <Main/>
			      </Grid>
			      <Grid item>
				      <BottomBar/>
			      </Grid>
		      </Grid>
	      </div>
	    </Grid>
	  </MuiThemeProvider>
	</div>
);

export { App };
