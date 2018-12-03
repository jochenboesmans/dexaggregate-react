const tryUpdateExchangeMarkets = require("./exchangemarkets/tryUpdateExchangeMarkets");

module.exports = () => {
	tryUpdateExchangeMarkets();
	const intervalInSeconds = 30;
	setInterval(async () => {
			await tryUpdateExchangeMarkets();
		}, intervalInSeconds * 1000);

};
