import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const lightTheme: Theme = createMuiTheme({
	typography: {
		fontFamily: `"Roboto Mono"`,
		fontSize: 16,
	},
	palette: {
		primary: purple,
		background: {
			paper: `#F9F9F9`,
			default: `#F0F0F0`,
		}
	},
	overrides: {
		MuiButton: {
			root: {
				background: `linear-gradient(45deg, #019474 30%, #0071AC 90%)`,
				borderRadius: 3,
				border: 0,
				color: `black`,
				height: 58,
				padding: `0 30px`,
			},
		},
	},
});

const darkTheme: Theme = createMuiTheme({
	typography: {
		fontFamily: `"Roboto Mono"`,
		fontSize: 16,
	},
	palette: {
		type: `dark`,
		primary: purple,
		background: {
			paper: `#202020`,
			default: `#282828`,
		},
	},
	overrides: {
		MuiButton: {
			root: {
				background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
				borderRadius: 3,
				border: 0,
				color: `white`,
				height: 58,
				padding: `0 30px`,
			},
		}
	},
});

export { lightTheme, darkTheme };