import axios from 'axios';

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [KyberDocs]{@link https://developer.kyber.network/docs/Trading/#market}.
 */
export const getMarket = async () => {
	const result = await axios.get("https://api.kyber.network/market");
	if (result.error) {
		console.log(`Error while trying to fetch market from Kyber API: ${result.error}`);
	} else {
		return result.data.data;
	}
};