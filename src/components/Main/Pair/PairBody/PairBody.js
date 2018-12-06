import React, {Component} from "react";
import _ from "lodash";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

import {formatPercentage, formatPrice} from "../../../../util/formatFunctions";
import {rebaseRate} from "../../../../util/marketFunctions";

class PairBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			p: props.p,
			market: props.market,
			sortedMarketData: props.sortedMarketData
		};
	}
	render() {
		const market = this.state.market;
		const p = this.state.p;
		const sortedMarketData = this.state.sortedMarketData;
		return (
			<TableBody>
				{_.map(sortedMarketData, emd => {
					const innerBid = rebaseRate(market, p.base_symbol, p.quote_symbol, "DAI", emd.current_bid);
					const innerAsk = rebaseRate(market, p.base_symbol, p.quote_symbol, "DAI", emd.current_ask);
					const last = rebaseRate(market, p.base_symbol, p.quote_symbol, "DAI", emd.last_traded);
					const combVol = rebaseRate(market, p.base_symbol, p.quote_symbol, "DAI", emd.volume);
					const fInnerBid = formatPrice(innerBid);
					const fInnerAsk = formatPrice(innerAsk);
					const fLast = formatPrice(last);
					const fCombVol = formatPrice(combVol);
					const spreadRatioDifference = (innerAsk / innerBid) - 1;
					const fSpreadPercentage = formatPercentage(spreadRatioDifference);

					return (
						<TableRow hover onClick={() => this.handleClick(emd.exchange, p)} key={emd.exchange.ID}>
							<TableCell>{emd.exchange.name}</TableCell>
							<TableCell numeric>{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
							<TableCell numeric>{`${fLast}`}</TableCell>
							<TableCell numeric>{`${fCombVol}`}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		)
	}
	handleClick = (exchange, p) => {
		let url;
		switch(exchange.ID) {
			case "KYBER":
				url = `https://kyber.network/swap/${p.base_symbol}_${p.quote_symbol}`;
				break;
			case "BANCOR":
				url = "https://www.bancor.network/tokens";
				break;
			case "OASIS":
				url = "https://oasis.direct/";
				break;
			case "PARADEX":
				url = `https://paradex.io/market/${p.quote_symbol}-${p.base_symbol}`;
				break;
			case "DDEX":
				url = `https://ddex.io/trade/${p.base_symbol}-${p.quote_symbol}`;
				break;
			case "IDEX":
				url = `https://idex.market/${p.base_symbol}/${p.quote_symbol}`;
				break;
			default:
				break;
		}
		window.open(url, "_blank");
	}

}

export default PairBody;