import React, {Component} from "react";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./themes/App";

import Main from "./components/Main/Main";
import BottomBar from "./components/Footer/BottomBar";
import Header from "./components/Header/Header";

class App extends Component {

	render() {
		return (
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
								alignItems="stretch"
								justify="space-between"
								style={{width: "70vw"}}
								spacing={16}
							>
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
		)
	}
}

export default connect(({activePage}) => ({activePage}))(App);
