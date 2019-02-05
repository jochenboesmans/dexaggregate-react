const tryUpdateExchangeMarkets = require("./exchangemarkets/tryUpdateExchangeMarkets");

module.exports = async () => {
	await tryUpdateExchangeMarkets();
	const intervalInSeconds = 30;
	setInterval(async () => {
		await tryUpdateExchangeMarkets();
	}, intervalInSeconds * 1000);

};
