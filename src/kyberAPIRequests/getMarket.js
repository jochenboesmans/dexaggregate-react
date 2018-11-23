import axios from 'axios';
import _ from "lodash";

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [KyberDocs]{@link https://developer.kyber.network/docs/Trading/#market}.
 */
export const getMarket = async () => {
	try {
		const result = await axios.get("https://api.kyber.network/market");
		const retrievedKyberMarket = result.data.data;
		const filterHighVolume = _.filter(retrievedKyberMarket, p => p.eth_24h_volume >= 1);
		return _.map(filterHighVolume, p => {
			return (
				{
					quote_symbol: p.quote_symbol,
					base_symbol: p.base_symbol,
					market_data: {
						last_traded: p.last_traded,
						current_bid: p.current_bid,
						current_ask: p.current_ask,
						past_24h_high: p.past_24h_high,
						past_24h_low: p.past_24h_low,
						eth_24h_volume: p.eth_24h_volume
					}
				}
			)}
		);
	} catch (error) {
		console.log(`Error while trying to fetch market from Kyber API: ${error}`);
	}
};
