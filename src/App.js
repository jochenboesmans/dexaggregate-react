import React, { Component } from 'react';
import _ from "lodash";

import {getMarket}  from "./model/getMarket";

/**
 * Simple React app that displays market data from various exchanges.
 *
 * TODO: refactoring.
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
			market: {}
        });
    }
    async componentDidMount() {
		const market = await getMarket();
        this.setState({market});
    }

    toDAI(priceInETH) {
        const DAI = _.find(this.state.market, p => p.quote_symbol === "DAI");
        return (priceInETH / DAI.kyber_market_data.last_traded);
    }

    p24hLow(p) {
		return (p.idex_market_data ? this.toDAI(p.idex_market_data.past_24h_low).toPrecision(5) : 0)
	}
	pCurrentBid(p) {
		return (p.idex_market_data ? this.toDAI(p.idex_market_data.current_bid).toPrecision(5) : 0);
	}

	pLastTraded(p) {
		return (p.idex_market_data ? this.toDAI(p.idex_market_data.last_traded).toPrecision(5) : 0);
	}
	pCurrentAsk(p) {
    	return (p.idex_market_data ? this.toDAI(p.idex_market_data.current_ask).toPrecision(5) : 0);
	}
	p24hHigh(p) {
    	return (p.idex_market_data ? this.toDAI(p.idex_market_data.past_24h_high).toPrecision(5) : 0);
	}
	p24hVolume(p) {
    	return (p.idex_market_data ? this.toDAI(p.idex_market_data.eth_24h_volume).toFixed(0) : 0);
	}

    renderMarket() {
    	const ordered = _.orderBy(this.state.market, p => p.kyber_market_data.eth_24h_volume, "desc");
        return (
        	<div>
				<table style={{width: "100%"}}>
					<thead>
						<tr>
							<th>Token</th><th>Kyber Spread (DAI)</th><th>Kyber Volume (ETH)</th><th>Idex Spread (DAI)</th><th>Idex Volume (ETH)</th>
						</tr>
					</thead>
					<tbody>
					{_.map(ordered,
						p =>
							<tr key={p.quote_symbol}>
								<td>{`${p.quote_symbol}`}</td>
								<td>{`($${this.toDAI(p.kyber_market_data.current_bid).toPrecision(5)} | $${this.toDAI(p.kyber_market_data.last_traded).toPrecision(5)} | $${this.toDAI(p.kyber_market_data.current_ask).toPrecision(5)})`}</td>
								<td>{`$${this.toDAI(p.kyber_market_data.eth_24h_volume).toFixed(0)}`}</td>
								<td>{`($${this.pCurrentBid(p)} | $${this.pLastTraded(p)} | $${this.pCurrentAsk(p)})`}</td>
								<td>{`$${this.p24hVolume(p)}`}</td>
							</tr>
					)}
					</tbody>
				</table>
			</div>
		)
    }
    render() {
    	console.log(this.state);
        return (
            <div className="App" style={{textAlign: "center"}}>
                {this.renderMarket()}
            </div>
        );
    }
}

export default App;
