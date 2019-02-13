import _ from "lodash";
import React from "react";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";

import { formatPercentage, formatPrice, formatVolume } from "../../../../util/formatFunctions";
import {
	highestCurrentBidEMDAcrossExchanges,
	lowestCurrentAskEMDAcrossExchanges
} from "../../../../util/marketFunctions";

const PairBody = ({ p, market }) => {
	const sortedMarketData = p ? _.orderBy(p.market_data, [emd => emd.volume], "desc") : null;
	return (
		<TableBody>
			{_.map(sortedMarketData, emd => {
				const innerBid = emd.current_bid_dai;
				const innerAsk = emd.current_ask_dai;
				const lastTraded = emd.last_traded_dai;
				const combinedVolume = emd.volume_dai;
				const fInnerBid = formatPrice(innerBid);
				const fInnerAsk = formatPrice(innerAsk);
				const fLastTraded = formatPrice(lastTraded);
				const fCombinedVolume = formatVolume(combinedVolume);
				const spreadRatioDifference = ((innerAsk / innerBid) - 1) || 0;
				const fSpreadPercentage = formatPercentage(spreadRatioDifference);
				if (emd === lowestCurrentAskEMDAcrossExchanges(market, p.base_symbol, p.quote_symbol) &&
					emd === highestCurrentBidEMDAcrossExchanges(market, p.base_symbol, p.quote_symbol)) {
					return (
						<TableRow hover
						          onClick={() => handleClick(emd.exchange, p)}
						          key={emd.exchange.ID}
						>
							<TableCell style={{fontStyle: "italic", color: "green"}}>{emd.exchange.name}</TableCell>
							<TableCell style={{fontStyle: "italic", color: "green"}} numeric>{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
							<TableCell style={{fontStyle: "italic", color: "green"}} numeric>{`${fLastTraded}`}</TableCell>
							<TableCell style={{fontStyle: "italic", color: "green"}} numeric>{`${fCombinedVolume}`}</TableCell>
						</TableRow>
					)
				}
				if (emd === lowestCurrentAskEMDAcrossExchanges(market, p.base_symbol, p.quote_symbol) && sortedMarketData.length > 1){
					return (
						<TableRow hover
						          onClick={() => handleClick(emd.exchange, p)}
						          key={emd.exchange.ID}
						>
							<TableCell style={{color: "green"}}>{emd.exchange.name}</TableCell>
							<TableCell style={{color: "green"}} numeric>{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
							<TableCell style={{color: "green"}} numeric>{`${fLastTraded}`}</TableCell>
							<TableCell style={{color: "green"}} numeric>{`${fCombinedVolume}`}</TableCell>
						</TableRow>
					);
				} else if (emd === highestCurrentBidEMDAcrossExchanges(market, p.base_symbol, p.quote_symbol) && sortedMarketData.length > 1) {
					return (
						<TableRow hover
						          onClick={() => handleClick(emd.exchange, p)}
						          key={emd.exchange.ID}
						>
							<TableCell style={{color: "red"}}>{emd.exchange.name}</TableCell>
							<TableCell style={{color: "red"}} numeric>{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
							<TableCell style={{color: "red"}} numeric>{`${fLastTraded}`}</TableCell>
							<TableCell style={{color: "red"}} numeric>{`${fCombinedVolume}`}</TableCell>
						</TableRow>
					)
				} else {
					return (
						<TableRow hover
						          onClick={() => handleClick(emd.exchange, p)}
						          key={emd.exchange.ID}
						>
							<TableCell >{emd.exchange.name}</TableCell>
							<TableCell numeric>{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
							<TableCell numeric>{`${fLastTraded}`}</TableCell>
							<TableCell numeric>{`${fCombinedVolume}`}</TableCell>
						</TableRow>
					);
				}
			})}
		</TableBody>
	)
};

const exchangeURL = {
	"KYBER": (p) => `https://kyber.network/swap/${p.base_symbol}_${p.quote_symbol}`,
	"OASIS": (p) => `https://oasis.direct/`,
	"PARADEX": (p) => `https://paradex.io/market/${p.quote_symbol}-${p.base_symbol}`,
	"DDEX": (p) => `https://ddex.io/trade/${p.base_symbol}-${p.quote_symbol}`,
	"IDEX": (p) => `https://idex.market/${p.base_symbol}/${p.quote_symbol}`,
	"RADAR": (p) => `https://app.radarrelay.com/${p.quote_symbol}/${p.base_symbol}`,
	"UNISWAP": (p) => `https://uniswap.exchange/swap`,
	"TOKENSTORE": (p) => `https://token.store/trade/${p.quote_symbol}`,
	"ETHERDELTA": (p) => `https://etherdelta.com/#${p.quote_symbol}-${p.base_symbol}`
};

const handleClick = (exchange, p) => {
	const URL = exchangeURL[exchange.ID](p);
	window.open(URL, "_blank");
};

export { PairBody };