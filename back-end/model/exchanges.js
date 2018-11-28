const axios = require("axios");

const getKyberMarket = async () => {
	const url = "http://localhost:5000/api/markets/kyber";
	try {
		return (await axios.get(url)).data
	} catch (error) {
		console.log(`Error while trying to fetch data from ${url}: ${error}`);
	}
};
const getOasisMarket = async () => {
	const url = "http://localhost:5000/api/markets/oasis";
	try {
		return (await axios.get(url)).data
	} catch (error) {
		console.log(`Error while trying to fetch data from ${url}: ${error}`);
	}
};
const getIdexMarket = async () => {
	const url = "http://localhost:5000/api/markets/idex";
	try {
		return (await axios.get(url)).data
	} catch (error) {
		console.log(`Error while trying to fetch data from ${url}: ${error}`);
	}
};
const getBancorMarket = async () => {
	const url = "http://localhost:5000/api/markets/bancor";
	try {
		return (await axios.get(url)).data
	} catch (error) {
		console.log(`Error while trying to fetch data from ${url}: ${error}`);
	}
};

const KYBER_NETWORK = {
	name: "Kyber Network",
	getMarket: getKyberMarket()
};
const OASIS_DEX = {
	name: "Oasis Dex",
	getMarket: getOasisMarket()
};
const IDEX = {
	name: "Idex",
	getMarket: getIdexMarket()
};
const BANCOR = {
	name: "Bancor",
	getMarket: getBancorMarket()
};

// TODO: Re-add BANCOR
const exchanges = {KYBER_NETWORK, OASIS_DEX, IDEX};

module.exports = exchanges;