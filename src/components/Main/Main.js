import React, { Component } from 'react';
import {connect} from "react-redux";

import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField/TextField";

import * as actions from "../../actions";

import Market from "./Market/Market";



/**
 * Simple React app that displays market data from various exchanges.
 */
class Main extends Component {

	handleSearchChange = event => {
		this.props.setSearchFilter((event.target.value).toUpperCase());
		this.props.setDeltaY(0);
	};

	handleChangePage = (event, page) => {
		this.props.setTablePage(page)
	};

	render() {
		return (
			<div className="Main">
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="stretch"
					spacing={8}
				>
					<Grid item>
						<TextField
							className="root"
							id="token-search"
							label="Token search"
							type="search"
							variant="outlined"
							onChange={this.handleSearchChange}
							fullWidth
						/>
					</Grid>
					<Grid item>
						<Market/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps({market, searchFilter, exchanges, tablePage}) {
	return {market, searchFilter, exchanges, tablePage};
}

export default connect(mapStateToProps, actions)(Main);