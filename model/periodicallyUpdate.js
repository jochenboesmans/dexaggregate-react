const tryUpdateExchangeMarkets = require("./exchangemarkets/tryUpdateExchangeMarkets");

module.exports = () => {
	tryUpdateExchangeMarkets();
	const intervalInSeconds = 10;
	setInterval(async () => {
			await tryUpdateExchangeMarkets();
		}, intervalInSeconds * 1000);

};
