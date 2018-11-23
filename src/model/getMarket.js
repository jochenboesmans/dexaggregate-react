import {getMarket as getKyberMarket} from "../kyberAPIRequests/getMarket";
import _ from "lodash";
import {getMarket as getIdexMarket} from "../idexAPIRequests/getMarket";

/**
 *
 * @returns A collection of token pairs
 */
export const getMarket = async () => {
	 /*return {
		quote_symbol: string,
		base_symbol: string,
		kyber: {
				last_traded: float,
				current_bid: float,
				current_ask: float,
				past_24h_high: float,
				past_24h_low: float,
				eth_24h_volume: float
				}
	 };*/
	const kyberMarket = await getKyberMarket();
	const idexMarket = await getIdexMarket();
	let market = [];
	_.forEach(kyberMarket, kyberPair => {
		let newPair = {
			quote_symbol: kyberPair.quote_symbol,
			base_symbol: kyberPair.base_symbol,
			kyber_market_data: kyberPair.market_data
		};
		_.forEach(idexMarket, idexPair => {
			if (kyberPair.quote_symbol === idexPair.quote_symbol
				&& kyberPair.base_symbol === idexPair.base_symbol) {
				newPair.idex_market_data = idexPair.market_data
			}
		});
		market.push(newPair);
	});
	return market;
};