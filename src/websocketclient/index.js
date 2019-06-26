import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({
	uri: `http://dexaggregate.com/graphql`
});

const daiRebasedMarket = gql`
  {
    rebasedMarket (rebaseAddress: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359") {
      baseAddress
      pairs {
        baseSymbol,
        quoteSymbol,
        marketData {
          exchange,
          lastPrice,
          currentAsk,
          currentBid,
          baseVolume
        }
      }
    }
  }
`;

const exchanges = gql`
	{ 
		exchanges 
	}
`;

const lastUpdate = gql`
	{ 
		lastUpdate {
			pair {
			  baseSymbol,
			  quoteSymbol,
			  marketData {
				baseVolume,
				currentAsk,
				currentBid,
				exchange,
				lastPrice,
				timestamp
			  }
			}
			utcTime
		  }
	}
`;

const subscribeToSocketBroadcasts = async (dispatch) => {
	let market = (await client.query({
		query: daiRebasedMarket
	})).data.rebasedMarket.pairs;

	/*let exchanges = (await client.query({
		query: exchanges
	})).data.exchanges;

	let lastUpdate = (await client.query({
		query: lastUpdate
	})).data.lastUpdate;*/

	dispatch({ type: `SET`, payload: { market }});
};

const unsubscribeFromSocketBroadcasts = (dispatch) => {

};

export { subscribeToSocketBroadcasts, unsubscribeFromSocketBroadcasts };