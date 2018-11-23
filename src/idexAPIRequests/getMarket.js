import axios from "axios";
import _ from "lodash";
/**
 * (GET) Retrieve all ETH-based IDEX markets
 * 	More info at [Idex Docs]{@link https://github.com/AuroraDAO/idex-api-docs#returnticker}.
 */
export const getMarket = async () => {
	try {
		const pairs = (await axios.post("https://api.idex.market/returnTicker", {
			json: {}
		})).data;
		const listOfPairs = Object.keys(pairs).map(key => {
			return { pair: key, ...pairs[key] }
		});
		const filtered = _.filter(listOfPairs, p => parseBaseSymbol(p.pair) === "ETH");
		const mapped = _.map(filtered, p => {
			return (
				{
					quote_symbol: parseQuoteSymbol(p.pair),
					base_symbol: parseBaseSymbol(p.pair),
					market_data: {
						last_traded: parseFloat(p.last),
						current_bid: parseFloat(p.highestBid),
						current_ask: parseFloat(p.lowestAsk),
						past_24h_high: parseFloat(p.high),
						past_24h_low: parseFloat(p.low),
						eth_24h_volume: parseFloat(p.baseVolume)
					}
				}
			)}
		);
		return _.filter(mapped, p => p.market_data.eth_24h_volume >= 1);

	} catch (err) {
		console.log(`Error while trying to fetch market from IDEX API: ${err})`);
	}
};

const parseQuoteSymbol = (pair) => {
	return pair.split('_')[1];
};

const parseBaseSymbol = (pair) => {
	return pair.split('_')[0];
};