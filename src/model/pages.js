import React from 'react';

import Main from "../components/Main/Main";
import Pair from "../components/Pair/Pair";

export const pages = {
	MAIN: {
		name: "Main Page",
		view: <Main/>
	},
	PAIR: {
		name: "Pair Page",
		view: <Pair/>
	}
};