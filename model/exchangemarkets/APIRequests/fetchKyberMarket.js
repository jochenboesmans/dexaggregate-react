const Web3 = require("web3");
const _ = require("lodash");
const axios = require("axios");

// connect to infura node
const projectID = `3623107a49ce48a9b3687ec820e8a222`;
const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectID}`);

const { KYBER } = require("../../exchanges");

let kyberCurrencies;
let kyberNetworkProxyContract;

/**
 * Retrieves the current market from the Kyber API.
 */
module.exports = async () => {
	try {
		kyberCurrencies = await retrieveKyberCurrencies();
		kyberNetworkProxyContract = await getKyberNetworkProxyContact();
		return await formatKyberMarket(await retrieveKyberMarket());
	} catch (error) {
		console.log(`Error while trying to fetch market from ${KYBER.name} API: ${error}`);
	}
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 * 	More info at [Kyber Docs]{@link https://developer.kyber.network/docs/Trading/#market}.
 */
const retrieveKyberMarket = async () => (await axios.get("https://api.kyber.network/market")).data.data;
const retrieveKyberCurrencies = async () => (await axios.get("https://api.kyber.network/currencies")).data.data;

const getKyberNetworkProxyContact = async () => {
	const address = `0x818E6FECD516Ecc3849DAf6845e3EC868087B755`;
	const ABI = await getContractABI(address);
	return new web3.eth.Contract(ABI, address);
};

const getContractABI = async (address) => {
	try {
		const etherscanEndpoint = `http://api.etherscan.io/api?module=contract&action=getabi&address=${address}`;
		const result = await axios.get(etherscanEndpoint);
		return JSON.parse(result.data.result);
	} catch (err) {
		console.log(err);
	}

};

const getExpectedRate = async (srcSymbol, destSymbol) => {
	const src = _.find(kyberCurrencies, currency => currency.symbol === srcSymbol);
	const dest = _.find(kyberCurrencies, currency => currency.symbol === destSymbol);
	const srcAddress = src ? src.address : null;
	const destAddress = dest ? dest.address : null;
	if (srcAddress && destAddress) {
		const rates = await kyberNetworkProxyContract.methods.getExpectedRate(srcAddress, destAddress, 1).call();
		return rates.expectedRate / 10 ** 18;
	} else {
		return null;
	}
};

/* Formats a given retrievedKyberMarket into the application-specific exchangeMarket structure. */
const formatKyberMarket = async (retrievedKyberMarket) => {
	const unfiltered = await Promise.all(_.map(retrievedKyberMarket, async p => {
		const currentBid = await getExpectedRate(p.quote_symbol, p.base_symbol);
		const rate = (await getExpectedRate(p.base_symbol, p.quote_symbol));
		const currentAsk = rate ? (1 / rate) : null;

		if (currentBid && currentAsk) {
			return {
				base_symbol: p.base_symbol,
				quote_symbol: p.quote_symbol,
				market_data: {
					exchange: KYBER,
					last_traded: p.last_traded,
					current_bid: currentBid,
					current_ask: currentAsk,
					past_24h_high: p.past_24h_high,
					past_24h_low: p.past_24h_low,
					volume: p.eth_24h_volume
				}
			}
		}
	}));
	return _.filter(unfiltered, pair => pair);
};