import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import * as actions from "../../actions";

class Title extends Component {
	render() {
		return (
				<Typography onClick={() => this.props.resetState()} variant="h3" align="center" style={{fontSize:"68px"}}>
					{this.props.title}
				</Typography>
		)
	}
}

export default connect(({title}) => ({title}), actions)(Title);