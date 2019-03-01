import React, { lazy, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

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
export default TitleBar;