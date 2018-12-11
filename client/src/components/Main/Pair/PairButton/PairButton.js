import React, {Component} from "react";
import {connect} from "react-redux";

import Button from "@material-ui/core/Button/Button";

import {pages} from "../../../../model/pages";
import * as actions from "../../../../actions";
import Grid from "@material-ui/core/Grid/Grid";

class PairButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			p: props.p,
			hover: false
		}
	}
	renderActualPairButton() {
		const p = this.state.p;
		if (this.state.hover) {
			return (
				<Button fullWidth
						onClick={() => {
							this.props.setPage(pages.MARKET)
						}}
						style={{fontSize: 24, fontWeight: "bold"}}
				>
					Back
				</Button>
			)
		} else {
			return (
				<Button fullWidth
						onClick={() => {
							this.props.setPage(pages.MARKET)
						}}
						style={{fontSize: 24, fontWeight: "bold"}}
				>
					{`${p.base_symbol}/${p.quote_symbol}`}
				</Button>
			)
		}
	}
	render() {
		return (
			<Grid item
				  onMouseLeave={() => {this.setState({hover: false})}}
				  onMouseEnter={() => {this.setState({hover: true})}}
			>
			{this.renderActualPairButton()}
			</Grid>
		)
	}
}

export default connect(null, actions)(PairButton);