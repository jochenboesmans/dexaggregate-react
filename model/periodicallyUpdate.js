const Web3 = require("web3");
const _ = require("lodash");
const axios = require("axios");

// connect to infura node
const projectID = `3623107a49ce48a9b3687ec820e8a222`;
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectID}`);

const tryUpdateExchangeMarkets = require("./exchangemarkets/tryUpdateExchangeMarkets");
let lastUpdate = 0;

module.exports = async () => {
	const subscription = web3.eth.subscribe("newBlockHeaders", (error, result) => {
		console.log("new block");
	})
	.on("data", (blockHeader) => {
		console.log("new data");
		if (Date.now() - lastUpdate >= 10 * 1000) {
			tryUpdateExchangeMarkets(web3);
			lastUpdate = Date.now();
		}
	})

};
