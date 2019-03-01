import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";

const Market = lazy(() => import("./Market/Market"));
const Pair = lazy(() => import("./Pair/Pair"));


const unconnectedBody = ({ activePage }) => {
	const componentsByPageID = {
		MARKET: <Market/>,
		PAIR: <Pair/>,
	};
	return (
		<Suspense fallback={<div>Loading...</div>}>
			{componentsByPageID[activePage.ID]}
		</Suspense>
	);
};

const Body = connect(({ activePage }) => ({ activePage }))(unconnectedBody);
export default Body;