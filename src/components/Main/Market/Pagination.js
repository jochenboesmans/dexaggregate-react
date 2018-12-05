import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import TableRow from "@material-ui/core/TableRow/TableRow";
import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import TableFooter from "@material-ui/core/es/TableFooter/TableFooter";

class Pagination extends Component {
	handleChangePage = (event, page) => {
		this.props.setTablePage(page)
	};

	render() {
		return (
					<TablePagination
						rowsPerPageOptions={[10]}
						component="div"
						count={this.props.market.market ? this.props.market.market.length : 0}
						rowsPerPage={10}
						page={this.props.tablePage}
						onChangePage={this.handleChangePage}
					/>
		)
	}
}

export default connect(({market, tablePage}) => ({market, tablePage}), actions)(Pagination);