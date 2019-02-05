const Web3 = require("web3");
const _ = require("lodash");
const axios = require("axios");

// connect to infura node
const projectID = `3623107a49ce48a9b3687ec820e8a222`;
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectID}`);

const { UNISWAP } = require("../../exchanges");

const factoryAddress = "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95";
const factoryABI = [{"name": "NewExchange", "inputs": [{"type": "address", "name": "token", "indexed": true}, {"type": "address", "name": "exchange", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "initializeFactory", "outputs": [], "inputs": [{"type": "address", "name": "template"}], "constant": false, "payable": false, "type": "function", "gas": 35725}, {"name": "createExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": false, "payable": false, "type": "function", "gas": 187911}, {"name": "getExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": true, "payable": false, "type": "function", "gas": 715}, {"name": "getToken", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "exchange"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "getTokenWithId", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "uint256", "name": "token_id"}], "constant": true, "payable": false, "type": "function", "gas": 736}, {"name": "exchangeTemplate", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "tokenCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}];
const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);

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
	OMG: {
		symbol: "OMG",
		address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
	},
};

const exchangeAddress = async (token) => (await factoryContract.methods.getExchange(token.address).call()).out;

module.exports = async () => {
	try {
		const tickers = await Promise.all(_.map(tokens, async token => {
			const p = (await axios.get(`https://uniswap-analytics.appspot.com/api/v1/ticker?exchangeAddress=${(await exchangeAddress(token))}`)).data;
			if (p.symbol) {
				const market = {
					base_symbol: "ETH", quote_symbol: p.symbol, market_data: {
						exchange: UNISWAP,
						last_traded: Math.pow(p.lastTradePrice, -1),
						current_bid: p.invPrice,
						current_ask: p.invPrice,
						past_24h_high: null,
						past_24h_low: null,
						volume: p.tradeVolume / Math.pow(10, 18),
					}
				};
				return market;
			}
		}));
		return _.filter(tickers, el => el);
	} catch (error) {
		console.log(`Error while trying to fetch market from ${UNISWAP.name} API: ${error}`);
	}
};