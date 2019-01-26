import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button/Button";

import * as actions from "../../../../actions";

import { pages } from "../../../../model/pages";
import Grid from "@material-ui/core/Grid/Grid";


const unconnectedPairButton = ({ p, setPage }) => {
	const [state, setState] = useState({
		hover: false,
	});
	return (
		<Grid item
			  onMouseLeave={() => { setState({ hover: false }) }}
			  onMouseEnter={() => { setState({ hover: true }) }}
		>
			{renderActualPairButton(p, state.hover, setPage)}
		</Grid>
	)
};

const renderActualPairButton = (p, hover, setPage) => {
	if (hover) {
		return (
			<Button fullWidth
					onClick={() => {
						setPage(pages.MARKET)
					}}
					style={{ fontSize: 24, fontWeight: "bold" }}
			>
				Back
			</Button>
		)
	} else {
		return (
			<Button fullWidth
					onClick={() => {
						setPage(pages.MARKET)
					}}
					style={{ fontSize: 24, fontWeight: "bold" }}
			>
				{`${p.base_symbol}/${p.quote_symbol}`}
			</Button>
		)
	}
};

const PairButton = connect(null, actions)(unconnectedPairButton);

export { PairButton };