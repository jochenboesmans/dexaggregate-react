const axios = require("axios");

const getContractABI = async (address) => {
	try {
		const etherscanURL = `http://api.etherscan.io/api?module=contract&action=getabi&address=${address}`;
		const result = await axios.get(etherscanURL);
		return JSON.parse(result.data.result);
	} catch(err) {
		console.log(err);
	}
};

module.exports = { getContractABI };