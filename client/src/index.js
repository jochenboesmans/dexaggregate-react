/* Temporary solution for usage of alpha version of MUI styles */
import { install } from "@material-ui/styles";
import { updateViewport } from "./actions";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";

import { App } from "./App";
import { reducer } from "./reducers/index";
import { subscribeToSocketBroadcasts } from "./websocketclient";

install();
const store = createStore(reducer, {}, applyMiddleware(reduxThunk));
subscribeToSocketBroadcasts();

const reduxedApp = <Provider store={store}><App/></Provider>;

ReactDOM.render(reduxedApp, document.getElementById("root"));

export { store };
