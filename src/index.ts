import { createElement } from "react";
import { render } from "react-dom";

/* No lazy initialization here because component is always loaded. */
import GlobalContextProvider from "./components/GlobalContextProvider";

render(createElement(GlobalContextProvider), document.getElementById(`root`));