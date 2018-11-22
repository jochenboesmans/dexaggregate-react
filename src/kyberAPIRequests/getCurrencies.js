import axios from 'axios';

/**
 * (GET) Returns a list of all possible tokens available for trade.
 * 	More info at [KyberDocs]{@link https://developer.kyber.network/docs/Trading/#currencies}.
 */
export const getCurrencies = async () => {
	const result = await axios.get("https://api.kyber.network/currencies");
	if (result.error) {
		console.log(`Error while trying to fetch currencies from Kyber API: ${result.error}`);
	} else {
		return result.data.data;
	}
};