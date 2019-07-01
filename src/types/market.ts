type RebasedMarket = {
	baseAddress: string,
	pairs: [Pair]
}

type Pair = {
	baseSymbol: string,
	quoteSymbol: string,
	marketData: [ExchangeMarketData]
}

type ExchangeMarketData = {
	exchange: string,
	lastPrice: number,
	currentAsk: number,
	currentBid: number,
	baseVolume: number,
	timestamp: number
}

type Exchanges = [string]

type LastUpdate = {
	utcTime: string,
	timestamp: number,
	pair: Pair
}

export { RebasedMarket, Pair, ExchangeMarketData, Exchanges, LastUpdate };