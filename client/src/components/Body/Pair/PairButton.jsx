import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";

import * as actions from "../../../actions";

import { pages } from "../../../model/pages";

const unconnectedPairButton = ({ p, setPage }) => {
	const [state, setState] = useState({ hover: false });
	const innerText = state.hover ? `Back` : `${p.base_symbol}/${p.quote_symbol}`;
	return (
		<Grid
			item
      onMouseLeave={() => { setState({ hover: false }) }}
      onMouseEnter={() => { setState({ hover: true }) }}
		>
			<Button
				fullWidth
        onClick={() => {
	        setPage(pages.MARKET)
        }}
        style={{ fontSize: 24, fontWeight: "bold" }}
			>
				{innerText}
			</Button>
		</Grid>
	)
};

const PairButton = connect(null, actions)(unconnectedPairButton);

export { PairButton };