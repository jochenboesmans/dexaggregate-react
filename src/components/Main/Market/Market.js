import MarketHead from "./MarketHead/MarketHead";
import MarketBody from "./MarketBody/MarketBody";
import Table from "@material-ui/core/Table/Table";
import React, {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import Typography from "@material-ui/core/Typography/Typography";

class Market extends Component {
	render() {
		const deltaY = this.props.deltaY;
		const marketSize = this.props.market.market ? this.props.market.market.length : 0
		return (
			<div>
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
					<Grid item>
						<Typography style={{textAlign: "center"}} variant="caption">Displaying {1 + deltaY} - {Math.min(deltaY + 10, marketSize)}</Typography>
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

export default connect(({market, deltaY}) => ({market, deltaY}), actions)(Market);