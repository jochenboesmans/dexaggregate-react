import React, { useState } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";

import * as actions from "../../actions";

const unconnectedTitleBar = ({ resetState }) => {
	const [state, setState] = useState({
		                                   hover: false,
	                                   });

	return (
		<Grid item
		      onMouseLeave={() => { setState({ hover: false }) }}
		      onMouseEnter={() => { setState({ hover: true}) }}
		>
			{renderActualTitle(state.hover, resetState)}
		</Grid>
	)
};

const renderActualTitle = (hover, resetReduxState) => {
	const title = "ΣDEX";
	if (hover) {
		return (
			<Typography variant="h1"
			            align="center"
			            onClick={() => { resetReduxState() }}
			            style={{ cursor: "pointer", color: "grey" }}
			>
				{title}
			</Typography>
		)
	} else {
		return (
			<Typography variant="h1"
			            align="center"
			            onClick={() => { resetReduxState() }}
			>
				{title}
			</Typography>
		)
	}
};

const TitleBar = connect(null, actions)(unconnectedTitleBar);

export { TitleBar };