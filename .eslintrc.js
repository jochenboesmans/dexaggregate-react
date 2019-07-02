module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:import/warnings",
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2019,
		"sourceType": "module",
		"allowImportExportEverywhere": true
	},
	"plugins": [
		"react",
		"import",
		"jsx-a11y",
		"react-hooks"
	],
	"rules": {
		"indent": [
			"warn",
			"tab",
			{ "SwitchCase": 1 }
		],
		"linebreak-style": [
			"warn",
			"unix"
		],
		"quotes": [
			"warn",
			"double",
			{
				"avoidEscape": true,
				"allowTemplateLiterals": true
			}
		],
		"semi": [
			"warn",
			"always"
		],
		"no-undef": "off",
		"no-unused-vars": "off",
		"no-mixed-spaces-and-tabs": "off",
		"no-console": "warn",
	}
};