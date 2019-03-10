import React from "react";
import { render } from "react-dom";

import installMUIstyles from "@material-ui/styles/install";

/* No lazy initialization here because component is always loaded. */
import GlobalContextProvider from "./components/GlobalContextProvider";

/* Temporary solution for usage of alpha version of MUI styles */
installMUIstyles();

render(<GlobalContextProvider/>, document.getElementById(`root`));