import React from "react";
import { connect } from "react-redux";

import { Market } from "./Market/Market";
import { Pair } from "./Pair/Pair";

const unconnectedMain = ({ activePage }) => {
	switch (activePage.ID) {
		case "MARKET":
			return <Market/>;
		case "PAIR":
			return <Pair/>;
		default:
			return;
	}
};

const Main = connect(({ activePage }) => ({ activePage }))(unconnectedMain);

export { Main };