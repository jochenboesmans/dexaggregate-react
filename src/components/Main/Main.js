import React, {Component} from "react";
import {connect} from "react-redux";

import Market from "./Market/Market";
import Pair from "./Pair/Pair";

class Main extends Component {
	render() {
		switch (this.props.activePage.ID) {
			case "MARKET":
				return <Market/>;
			case "PAIR":
				return <Pair/>;
			default:
				return;
		}
	}
}

export default connect(({activePage}) => ({activePage}))(Main);