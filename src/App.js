import React, { Component } from 'react';
import {getCurrencies} from "./kyberAPIRequests/getCurrencies";
import _ from "lodash";
import {getMarket} from "./kyberAPIRequests/getMarket";

/**
 * Simple React app that displays market data from the Kyber web API.
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({market: []});
    }
    async componentDidMount() {
        const currencies = await getCurrencies();
		let market = await getMarket();
		market = _.map(market, p => {
		    let foundCurrency = _.find(currencies, c => c.symbol === p.quote_symbol);
		    return {...p, ...foundCurrency};
		});
		market = _.orderBy(market, "usd_24h_volume", "desc");
        this.setState({market});
    }
    /* TODO: Round to significant numbers */
    toDAI(priceInETH) {
        const daiETH = _.find(this.state.market, p => p.pair === "DAI_ETH");
        return (priceInETH / daiETH.last_traded).toFixed(2);
    }
    renderMarket() {
        return (
        	<table style={{width: "100%"}}>
				<thead>
					<tr>
						<th>Name</th><th>Symbol</th><th>Spread (DAI)</th><th>Last Price (DAI)</th><th>Volume (DAI)</th>
					</tr>
				</thead>
				<tbody>
				{_.map(this.state.market,
					p => <tr key={p.pair}><td>{p.name}</td><td>{p.quote_symbol}</td>
						<td>{`$${this.toDAI(p.current_bid)} - $${this.toDAI(p.current_ask)}`}</td>
						<td>{`$${this.toDAI(p.last_traded)}`}</td>
						<td>{`$${p.usd_24h_volume.toFixed(2)}`}</td>
					</tr>)}
				</tbody>
			</table>
		)
    }
    render() {
        return (
            <div className="App" style={{textAlign: "center"}}>
                {this.renderMarket()}
            </div>
        );
    }
}

export default App;
