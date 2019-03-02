import React, { lazy, useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const unconnectedTitleBar = ({ resetState }) => {
	const [hover, setHover] = useState(false);
	const style = hover ? { cursor: "pointer", color: "grey" } : {};
	const title = "ΣDEX";

	return (
		<Grid
			item
			onMouseLeave={() => { setHover(false) }}
			onMouseEnter={() => { setHover(true) }}
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