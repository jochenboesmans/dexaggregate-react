import MarketHead from "./MarketHead/MarketHead";
import MarketBody from "./MarketBody/MarketBody";
import Table from "@material-ui/core/Table/Table";
import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import {connect} from "react-redux";
import * as actions from "../../../actions";

class Market extends Component {
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
						<Table>
							<MarketHead/>
							<MarketBody/>
						</Table>
					</Grid>
				</Grid>
			</div>
		)
	}

	handleSearchChange = (event) => {
		this.props.setSearchFilter((event.target.value).toUpperCase());
		this.props.setDeltaY(0);
	};
}

export default connect(null, actions)(Market);