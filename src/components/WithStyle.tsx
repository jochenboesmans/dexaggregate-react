import React, { lazy, useContext, FC } from "react";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

import { darkTheme, lightTheme } from "../themes/App";
import { LightBulbStateContext } from "../state/contexts/contexts";

import WithGrid from "./WithGrid";

const WithStyle: FC = () => {
	const lightBulb = useContext(LightBulbStateContext);
	const theme = lightBulb ? lightTheme : darkTheme;

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline>
				<WithGrid/>
			</CssBaseline>
		</MuiThemeProvider>
	);
};

export default WithStyle;