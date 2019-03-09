import React, { lazy, useState, useContext } from "react";
import { connect } from "react-redux";

import { DispatchContext } from "../../index";

import { defaultDeltaY } from "src/reducers/deltaYReducer";
import { defaultPage } from "src/reducers/navigationReducer";
import { defaultSearchFilter } from "src/reducers/searchFilterReducer";
import { SET_DELTA_Y, SET_PAGE, SET_SEARCH_FILTER } from "src/actions/types";

import * as actions from "../../actions";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));

const TitleBar = () => {
	const [hover, setHover] = useState(false);
	const dispatch = useContext(DispatchContext);

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
				onClick={() => dispatch({ type: "RESET" })}
				style={style}
			>
				{title}
			</Typography>
		</Grid>
	)
};

//const TitleBar = connect(null, actions)(unconnectedTitleBar);
export default TitleBar;