import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import * as actions from "../../actions";
import Grid from "@material-ui/core/Grid/Grid";

class TitleBar extends Component {
	constructor(props) {
		super(props);
		this.state = {hover: false};
	}

	renderActualTitle() {
		const title = "ΣDEX";
		if (this.state.hover) {
			return (
				<Typography variant="h1"
							align="center"
							onClick={() => {this.props.resetState()}}
							style={{cursor: "pointer", color: "grey"}}
				>
					{title}
				</Typography>
			)
		} else {
			return (
				<Typography variant="h1"
							align="center">
					{title}
				</Typography>
			)
		}
	}

	render() {
		return (
			<Grid item
				  onMouseLeave={() => {this.setState({hover: false})}}
				  onMouseEnter={() => {this.setState({hover: true})}}
			>
				{this.renderActualTitle()}
			</Grid>
		)
	}
}

export default connect(null, actions)(TitleBar);