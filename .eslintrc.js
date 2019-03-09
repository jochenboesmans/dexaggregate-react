module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
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
		"import"
	],
	"rules": {
		"indent": [
			"warn",
			"tab"
		],
		"linebreak-style": [
			"warn",
			"unix"
		],
		"quotes": [
			"warn",
			"backtick"
		],
		"semi": [
			"warn",
			"always"
		],
		"no-undef": "warn",
		"no-unused-vars": "warn",
		"no-mixed-spaces-and-tabs": "warn"
	}
};