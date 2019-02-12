const { initializeUniswapFetcher } = require("./exchangemarkets/APIRequests/UniswapFetcher");
const { initializeKyberFetcher } = require("./exchangemarkets/APIRequests/KyberFetcher");
const { initializeIdexFetcher } = require("./exchangemarkets/APIRequests/IdexFetcher");
const { initializeDdexFetcher } = require("./exchangemarkets/APIRequests/DdexFetcher");
const { initializeEtherdeltaFetcher } = require("./exchangemarkets/APIRequests/EtherdeltaFetcher");
const { initializeOasisFetcher } = require("./exchangemarkets/APIRequests/OasisFetcher");
const { initializeRadarFetcher } = require("./exchangemarkets/APIRequests/RadarFetcher");
const { initializeTokenstoreFetcher } = require("./exchangemarkets/APIRequests/TokenstoreFetcher");
const { initializeParadexFetcher } = require("./exchangemarkets/APIRequests/ParadexFetcher");

const Web3 = require("web3");
/*const _ = require("lodash");
const axios = require("axios");*/

// connect to infura node
const projectID = `3623107a49ce48a9b3687ec820e8a222`;
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectID}`);

/*let lastUpdate = 0;

let subscription;*/

module.exports = async () => {
	initializeDdexFetcher();
	initializeEtherdeltaFetcher();
	initializeIdexFetcher();
	initializeKyberFetcher();
	initializeUniswapFetcher(web3);
	initializeRadarFetcher();
	initializeTokenstoreFetcher();
	initializeParadexFetcher();
	initializeOasisFetcher();

	/*subscription.on("data", (blockHeader) => {
		console.log("new data");
		if (Date.now() - lastUpdate >= 10 * 1000) {
			tryUpdateExchangeMarkets(web3);
			lastUpdate = Date.now();
		}
	});*/

};

/*const renewSubscription = () => {
	web3.eth.clearSubscriptions();
	subscription = web3.eth.subscribe("newBlockHeaders", (error, result) => {
		error ? console.log(error) : console.log(result);
	});
};*/
