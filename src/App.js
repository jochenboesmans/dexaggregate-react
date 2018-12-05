import React, {Component} from "react";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./themes/App";

import Title from "./components/Header/Title";
import MarketInformation from "./components/Header/MarketInformation";

class App extends Component {
	renderActivePage() {
		return this.props.activePage.view;
	}
	render() {
		return (
			<div className="App">
				<MuiThemeProvider theme={theme}>
					<Grid
						container
						direction="column"
						alignItems="center"
						justify="space-between"
						spacing={8}
					>
						<Grid item>
							<Title/>
						</Grid>
						<Grid item>
							<MarketInformation/>
						</Grid>
						<Grid item>
							{this.renderActivePage()}
						</Grid>
					</Grid>
				</MuiThemeProvider>
			</div>
		)
	}
}

export default connect(({activePage}) => ({activePage}))(App);
