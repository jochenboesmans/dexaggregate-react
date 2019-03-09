import React from "react";
import { render } from "react-dom";

/* No lazy initialization here because App is always loaded. */
import App from "./components/App";

render(<App/>, document.getElementById(`root`));