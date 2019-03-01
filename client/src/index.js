import React, { Suspense, lazy } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import install from "@material-ui/styles/install";

import { reducer } from "./reducers/index";
import { subscribeToSocketBroadcasts } from "./websocketclient";

/* Temporary solution for usage of alpha version of MUI styles */
install();

const App = lazy(() => import("./components/App"));

const store = createStore(reducer, {}, applyMiddleware(reduxThunk));
subscribeToSocketBroadcasts();

const reduxedApp = (
	<Provider store={store}>
		<Suspense fallback={<div>Loading...</div>}>
			<App/>
		</Suspense>
	</Provider>
);

render(reduxedApp, document.getElementById("root"));

export { store };