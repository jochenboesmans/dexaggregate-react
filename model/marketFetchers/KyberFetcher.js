const _ = require("lodash");
const axios = require("axios");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;

const initialize = async () => {
	await updateKyberMarket();
	setInterval(async () => {
		await updateKyberMarket();
	}, 15 * 1000);
};

const updateKyberMarket = async () => {
	try {
		const retrievedMarket = (await axios.get("https://api.kyber.network/market")).data.data;
		market = _.reduce(retrievedMarket, (result, pair) => {
			if(pair.base_symbol && pair.quote_symbol && pair.last_traded && pair.current_bid && pair.current_ask && pair.eth_24h_volume) {
				result.push({
					            b: pair.base_symbol,
					            q: pair.quote_symbol,
					            m: {
						            l: pair.last_traded,
						            b: pair.current_bid,
						            a: pair.current_ask,
						            v: pair.eth_24h_volume
					            }
				            });
			}
			return result;
		}, []);
		setModelNeedsBroadcast(true);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().KYBER.name} API: ${error}`);
	}
};

const getMarket = () => market;

module.exports = { initialize, getMarket };