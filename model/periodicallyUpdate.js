const Web3 = require("web3");
const _ = require("lodash");
const axios = require("axios");

// connect to infura node
const projectID = `3623107a49ce48a9b3687ec820e8a222`;
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectID}`);

const tryUpdateExchangeMarkets = require("./exchangemarkets/tryUpdateExchangeMarkets");

module.exports = async () => {

	await tryUpdateExchangeMarkets(web3);
	const intervalInSeconds = 30;
	setInterval(async () => {
		await tryUpdateExchangeMarkets(web3);
	}, intervalInSeconds * 1000);

};
