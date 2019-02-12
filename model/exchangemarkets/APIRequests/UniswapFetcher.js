const _ = require("lodash");
const axios = require("axios");

const { UNISWAP } = require("../../exchanges");
const { setModelNeedsBroadcast } = require("../../../websocketbroadcasts/modelNeedsBroadcast");

let storedWeb3;
let market = {};

const tokens = {
	BAT: { symbol: "BAT", address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef", },
	DAI: { symbol: "DAI", address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359", },
	MKR: { symbol: "MKR", address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2", },
	OMG: { symbol: "OMG", address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07", },
	SPANK: { symbol: "SPANK", address: "0x42d6622dece394b54999fbd73d108123806f6a18", },
	RLC: { symbol: "RLC", address: "0x607F4C5BB672230e8672085532f7e901544a7375", },
	TKN: { symbol: "TKN", address: "0xaaaf91d9b90df800df4f55c205fd6989c977e73a", },
	NEXO: { symbol: "NEXO", address: "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206", },
	FUN: { symbol: "FUN", address: "0x419d0d8bdd9af5e606ae2232ed285aff190e711b", },
	ANT: { symbol: "ANT", address: "0x960b236A07cf122663c4303350609A66A7B288C0", },
	ULT: { symbol: "ULT", address: "0xe884cc2795b9c45beeac0607da9539fd571ccf85", },
	REP: { symbol: "REP", address: "0x1985365e9f78359a9B6AD760e32412f4a445E862", },
	RDN: { symbol: "RDN", address: "0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6", },
	ZRX: { symbol: "ZRX", address: "0xe41d2489571d322189246dafa5ebde1f4699f498", },
	XCHF: { symbol: "XCHF", address: "0xb4272071ecadd69d933adcd19ca99fe80664fc08", },
	DGD: { symbol: "DGD", address: "0xe0b7927c4af23765cb51314a0e0521a9645f0e2a", },
	WBTC: { symbol: "WBTC", address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", },
};

const getExchangeAddress = async (token) => {
	const factoryAddress = `0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95`;
	const factoryABI = [{"name": "NewExchange", "inputs": [{"type": "address", "name": "token", "indexed": true}, {"type": "address", "name": "exchange", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "initializeFactory", "outputs": [], "inputs": [{"type": "address", "name": "template"}], "constant": false, "payable": false, "type": "function", "gas": 35725}, {"name": "createExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": false, "payable": false, "type": "function", "gas": 187911}, {"name": "getExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": true, "payable": false, "type": "function", "gas": 715}, {"name": "getToken", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "exchange"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "getTokenWithId", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "uint256", "name": "token_id"}], "constant": true, "payable": false, "type": "function", "gas": 736}, {"name": "exchangeTemplate", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "tokenCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}];
	const factoryContract = new storedWeb3.eth.Contract(factoryABI, factoryAddress);

	return (await factoryContract.methods.getExchange(token.address).call()).out;
};

const initializeUniswapFetcher = async (web3) => {
	storedWeb3 = web3;
	await updateUniswapMarket();
	setInterval(async () => {
		await updateUniswapMarket();
	}, 15 * 1000);
};

const updateUniswapMarket = async () => {
	try {
		const tickers = await Promise.all(_.map(tokens, async token => {
			const p = (await axios.get(`https://uniswap-analytics.appspot.com/api/v1/ticker?exchangeAddress=${(await getExchangeAddress(token))}`)).data;
			if (p.symbol) {
				return {
					base_symbol: "ETH", quote_symbol: p.symbol, market_data: {
						exchange: UNISWAP,
						last_traded: Math.pow(p.lastTradePrice, -1),
						current_bid: p.invPrice,
						current_ask: p.invPrice,
						volume: p.tradeVolume / Math.pow(10, 18),
					}
				};
			}
		}));
		market = _.filter(tickers, el => el);
		setModelNeedsBroadcast(true);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${UNISWAP.name} API: ${error}`);
	}

};

const getUniswapMarket = () => market;

module.exports = { initializeUniswapFetcher, getUniswapMarket };
