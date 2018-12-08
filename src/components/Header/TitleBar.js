import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import * as actions from "../../actions";

class TitleBar extends Component {
	render() {
		const title = "ΣDEX";
		return (
			<Typography onClick={() => this.props.resetState()} variant="h1" align="center">
				{title}
			</Typography>
		)
	}
}

export default connect(null, actions)(TitleBar);