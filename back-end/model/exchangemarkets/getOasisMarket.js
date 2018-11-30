const _ = require("lodash");
const axios = require("axios");

const exchanges = require("../market").exchanges;

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [MakerDAO Docs]{@link https://developer.makerdao.com/oasis/api/1/markets}.
 */
module.exports = async () => {
	try {
		const retrievedOasisPairs = await retrieveOasisPairs();
		/*if (outOfDate(retrievedOasisPairs.time)) {
		throw new Error(`Retrieved pairs from ${exchanges.OASIS.name} API is out of date.`);
		}*/
		const actualOasisPairs = retrievedOasisPairs.data;
		const activeOasisPairs = filterActivePairs(actualOasisPairs);
		const oasisMarket = await getOasisMarkets(activeOasisPairs);
		const filtered = _.filter(oasisMarket, m => m);
		return filtered;
	} catch (error) {
		console.log(`Error while trying to fetch pairs from Oasis API: ${error.message}`);
	}
};

const retrieveOasisPairs = async () => (await axios.get("http://api.oasisdex.com/v1/pairs/")).data;

const filterActivePairs = (actualOasisPairs) => _.filter(actualOasisPairs, p => p.active);

const getOasisMarkets = async (activeOasisPairs) => {
	const oasisMarketPromises = _.map(activeOasisPairs,  async p => {
		try {
			const m = await retrieveOasisMarket(p);
			if (m && parseFloat(m.last) && parseFloat(m.bid) && parseFloat(m.ask)
				&& parseFloat(m.high) && parseFloat(m.low) && parseFloat(m.vol)) {
				return formatOasisMarket(p, m);
			}
		} catch (error) {
			console.log(`Error while trying to fetch market of pair ${p.base}/${p.quote} from Oasis API: ${error}`);
		}
	});
	return (await Promise.all(oasisMarketPromises));
};

const retrieveOasisMarket = async (p) => (await axios.get(`http://api.oasisdex.com/v1/markets/${p.base}/${p.quote}`)).data.data;

const formatOasisMarket = (p, m) => {
	return {
		base_symbol: p.quote,
		quote_symbol: p.base,
		market_data: {
			exchange: exchanges.OASIS,
			last_traded: parseFloat(m.last),
			current_bid: parseFloat(m.bid),
			current_ask: parseFloat(m.ask),
			past_24h_high: parseFloat(m.high),
			past_24h_low: parseFloat(m.low),
			volume: parseFloat(m.vol) * parseFloat(m.last)
		}
	}
};

/**
 * Checks whether the given timestamp is more than 24 hours in the past.
 */
const outOfDate = (timestamp) => {
	let now = Date.now() / 1000;
	return (now - timestamp) >= 24 * 60 * 60 * 1000;
};