import React, { useState } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import * as actions from "../../actions";

const unconnectedTitleBar = ({ resetState }) => {
	const [state, setState] = useState({ hover: false });
	const style = state.hover ? { cursor: "pointer", color: "grey" } : {};
	const title = "ΣDEX";

	return (
		<Grid
			item
      onMouseLeave={() => { setState({ hover: false }) }}
      onMouseEnter={() => { setState({ hover: true}) }}
		>
			<Typography
				variant="h1"
        align="center"
        onClick={() => resetState()}
        style={style}
			>
				{title}
			</Typography>
		</Grid>
	)
};

const TitleBar = connect(null, actions)(unconnectedTitleBar);
export { TitleBar };