import React from "react";
import { connect } from "react-redux";

import { Market } from "./Market/Market";
import { Pair } from "./Pair/Pair";

const unconnectedMain = ({ activePage }) => {
	const componentsByPageID = {
		MARKET: <Market/>,
		PAIR: <Pair/>,
	};
	return componentsByPageID[activePage.ID];
};

const Body = connect(({ activePage }) => ({ activePage }))(unconnectedMain);
export { Body };