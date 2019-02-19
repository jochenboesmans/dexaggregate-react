/* Temporary solution for usage of alpha version of MUI styles */
import install from "@material-ui/styles/install";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";

import { App } from "./components/App";
import { reducer } from "./reducers/index";
import { subscribeToSocketBroadcasts } from "./websocketclient";

install();
const store = createStore(reducer, {}, applyMiddleware(reduxThunk));
subscribeToSocketBroadcasts();

const reduxedApp = <Provider store={store}><App/></Provider>;

render(reduxedApp, document.getElementById("root"));

export { store };
