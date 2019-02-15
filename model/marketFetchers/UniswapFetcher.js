const _ = require("lodash");
const axios = require("axios");
const Web3 = require("web3");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const projectID = `3623107a49ce48a9b3687ec820e8a222`;
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectID}`);
const factoryAddress = `0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95`;
const factoryABI = [{
	"name": "NewExchange",
	"inputs": [{
		"type": "address",
		"name": "token",
		"indexed": true
	}, {
		"type": "address",
		"name": "exchange",
		"indexed": true
	}],
	"anonymous": false,
	"type": "event"
}, {
	"name": "initializeFactory",
	"outputs": [],
	"inputs": [{
		"type": "address",
		"name": "template"
	}],
	"constant": false,
	"payable": false,
	"type": "function",
	"gas": 35725
}, {
	"name": "createExchange",
	"outputs": [{
		"type": "address",
		"name": "out"
	}],
	"inputs": [{
		"type": "address",
		"name": "token"
	}],
	"constant": false,
	"payable": false,
	"type": "function",
	"gas": 187911
}, {
	"name": "getExchange",
	"outputs": [{
		"type": "address",
		"name": "out"
	}],
	"inputs": [{
		"type": "address",
		"name": "token"
	}],
	"constant": true,
	"payable": false,
	"type": "function",
	"gas": 715
}, {
	"name": "getToken",
	"outputs": [{
		"type": "address",
		"name": "out"
	}],
	"inputs": [{
		"type": "address",
		"name": "exchange"
	}],
	"constant": true,
	"payable": false,
	"type": "function",
	"gas": 745
}, {
	"name": "getTokenWithId",
	"outputs": [{
		"type": "address",
		"name": "out"
	}],
	"inputs": [{
		"type": "uint256",
		"name": "token_id"
	}],
	"constant": true,
	"payable": false,
	"type": "function",
	"gas": 736
}, {
	"name": "exchangeTemplate",
	"outputs": [{
		"type": "address",
		"name": "out"
	}],
	"inputs": [],
	"constant": true,
	"payable": false,
	"type": "function",
	"gas": 633
}, {
	"name": "tokenCount",
	"outputs": [{
		"type": "uint256",
		"name": "out"
	}],
	"inputs": [],
	"constant": true,
	"payable": false,
	"type": "function",
	"gas": 663
}];
const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);
const getExchangeAddress = async (token, factoryContract) => (await factoryContract.methods.getExchange(token.address).call()).out;

const tokens = {
	BAT: {
		symbol: "BAT",
		address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
	},
	DAI: {
		symbol: "DAI",
		address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
	},
	MKR: {
		symbol: "MKR",
		address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
	},
	SPANK: {
		symbol: "SPANK",
		address: "0x42d6622dece394b54999fbd73d108123806f6a18",
	},
	ZRX: {
		symbol: "ZRX",
		address: "0xe41d2489571d322189246dafa5ebde1f4699f498",
	},
};

const initialize = async () => {
	const extendedTokens = await fetchExchangeAddresses();
	await tryUpdateMarket(extendedTokens);
	setInterval(async () => {
		await tryUpdateMarket(extendedTokens);
	}, 5 * 1000);
};

const fetchExchangeAddresses = async () => {
	return await Promise.all(_.map(tokens, async t => ({
		...t,
		exchangeAddress: await getExchangeAddress(t, factoryContract)
	})));
};

const tryUpdateMarket = async (extendedTokens) => {
	try {
		const tickers = await Promise.all(_.map(extendedTokens, async token => {
			const p = (await axios.get(`https://uniswap-analytics.appspot.com/api/v1/ticker?exchangeAddress=${token.exchangeAddress}`)).data;
			if(p.symbol) {
				return {
					b: "ETH",
					q: p.symbol,
					m: {
						l: Math.pow(p.lastTradePrice, -1),
						b: p.invPrice,
						a: p.invPrice,
						v: p.tradeVolume / Math.pow(10, 18),
					}
				};
			}
		}));
		const newMarket = _.filter(tickers, el => el);
		if (newMarket && !_.isEqual(newMarket, market)) {
			market = newMarket;
			timestamp = Date.now();
			setModelNeedsBroadcast(true);
			console.log("uniswap update");
		}
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().UNISWAP.name} API: ${error}`);
	}

};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};
