import MarketHead from "./MarketHead";
import MarketBody from "./MarketBody";
import Pagination from "./Pagination";
import Table from "@material-ui/core/Table/Table";
import React, {Component} from "react";

class Market extends Component {
	render() {
		return (
			<div>
				<Table>
					<MarketHead/>
					<MarketBody/>
				</Table>
				{/*<Pagination/>*/}
			</div>
		)
	}
}

export default Market;