const _ = require("lodash");
const axios = require("axios");

const { KYBER } = require("../../exchanges");
const { getContractABI } = require("./util/getContractABI");

let kyberCurrencies;

module.exports = async (web3) => {
	try {
		console.log(`KYBER START: ${Date.now()}`);
		kyberCurrencies = retrieveKyberCurrencies();
		return await constructKyberMarket(web3);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${KYBER.name} API: ${error}`);
	}
};

const retrieveKyberMarket = async () => (await axios.get("https://api.kyber.network/market")).data.data;
const retrieveKyberCurrencies = async () => (await axios.get("https://api.kyber.network/currencies")).data.data;

const getKyberNetworkProxyContact = async (web3) => {
	const address = `0x818E6FECD516Ecc3849DAf6845e3EC868087B755`;
	const ABI = await getContractABI(address);
	return new web3.eth.Contract(ABI, address);
};

const getExpectedRate = async (web3, srcSymbol, destSymbol) => {
	const src = _.find(kyberCurrencies, currency => currency.symbol === srcSymbol);
	const dest = _.find(kyberCurrencies, currency => currency.symbol === destSymbol);
	const srcAddress = src ? src.address : null;
	const destAddress = dest ? dest.address : null;
	if(srcAddress && destAddress) {
		const kyberNetworkProxyContract = getKyberNetworkProxyContact(web3);
		const rates = await kyberNetworkProxyContract.methods.getExpectedRate(srcAddress, destAddress, 1).call();
		return rates.expectedRate / 10 ** 18;
	} else {
		return null;
	}
};

const constructKyberMarket = async (web3) => {
	const retrievedKyberMarket = await retrieveKyberMarket();
	const unfiltered = await Promise.all(_.map(retrievedKyberMarket, async p => {
		const currentBid = await getExpectedRate(web3, p.quote_symbol, p.base_symbol);
		const askRate = await getExpectedRate(web3, p.base_symbol, p.quote_symbol);
		const currentAsk = askRate ? (1 / askRate) : null;

		if(currentBid && currentAsk) {
			return {
				base_symbol: p.base_symbol, quote_symbol: p.quote_symbol, market_data: {
					exchange: KYBER,
					last_traded: p.last_traded,
					current_bid: currentBid,
					current_ask: currentAsk,
					past_24h_high: p.past_24h_high,
					past_24h_low: p.past_24h_low,
					volume: p.eth_24h_volume,
				}
			};
		}
	}));
	return _.filter(unfiltered, pair => pair);
};