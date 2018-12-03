import React, {Component} from "react";
import {connect} from 'react-redux';
import * as actions from "./actions";

class App extends Component {

	componentDidMount() {
		this.props.updateExchanges();
	}
	render() {
		return (
			<div className="container">
				{this.props.activePage.view}
			</div>
		)
	}
}

function mapStateToProps({activePage, market}) {
	return {activePage, market};
}

export default connect(mapStateToProps, actions)(App);
