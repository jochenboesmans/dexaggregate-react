import { createMuiTheme } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";

const theme = createMuiTheme({
	                             typography: {
		                             fontFamily: "\"Courier New\"", fontSize: "16", useNextVariants: true
	                             }, overrides: {
		// Name of the component ⚛️ / style sheet
		MuiButton: {
			// Name of the rule
			root: {
				// Some CSS
				background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
				borderRadius: 3,
				border: 0,
				color: "white",
				height: 58,
				padding: "0 30px",
			},
		}
	},

	                             palette: {
		                             primary: purple,
	                             }
                             });

export { theme };