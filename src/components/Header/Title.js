import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import * as actions from "../../actions";

class Title extends Component {
	render() {
		return (
			<div>
				<Typography onClick={() => this.props.resetState()} variant="h1" align="center">
					{this.props.title}
				</Typography>
			</div>
		)
	}
}

export default connect(({title}) => ({title}), actions)(Title);