import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers";
import reduxThunk from "redux-thunk";

const store = createStore(reducer, {}, applyMiddleware(reduxThunk));
const reduxedApp = <Provider store={store}><App/></Provider>;

ReactDOM.render(reduxedApp, document.getElementById('root'));
