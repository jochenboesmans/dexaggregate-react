import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import TableBody from "@material-ui/core/TableBody/TableBody";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";

import * as actions from "../../../../actions";
import { pages } from "../../../../model/pages";
import { formatPrice, formatVolume } from "../../../../util/formatFunctions";
import { rebaseCombinedVolume, rebaseLastPrice } from "../../../../util/marketFunctions";

import { Spread } from "./Spread";

const unconnectedMarketBody = ({ market, searchFilter, deltaY, setDeltaY, setPage, setSearchFilter }) => {
	if (!market.market) {
		return null;
	}
	const m = market.market;
	const displayedMarket = _.orderBy(m, [p =>
		rebaseCombinedVolume(m, p.base_symbol, p.quote_symbol, "DAI")], ["desc"]);
	const filteredMarket = searchFilter ? _.filter(displayedMarket, p =>
		p.base_symbol.includes(searchFilter.toUpperCase()) ||
		p.quote_symbol.includes(searchFilter.toUpperCase())) : displayedMarket;
	const start = 0;
	const end = 10;
	const slicedMarket = filteredMarket.slice(start + deltaY, end + deltaY);
	return (
		<TableBody onWheel={(e) => {
			if (e.deltaY < 0 && deltaY > 9 && !searchFilter) {
				setDeltaY(deltaY - 10);
			} else if (e.deltaY > 0 && (deltaY < m.length - 10) && !searchFilter) {
				setDeltaY(deltaY + 10);
			}
		}}>
			{_.map(slicedMarket, p => {
					const last = formatPrice(rebaseLastPrice(m, p.base_symbol, p.quote_symbol, "DAI"));
					const combVol = formatVolume(rebaseCombinedVolume(m, p.base_symbol, p.quote_symbol, "DAI"));
					return (
						<TableRow hover
								  onClick={() => {
								  	setPage({...pages.PAIR, pair: p});
								  	setSearchFilter(null);
								  }}
								  key={`${p.base_symbol}/${p.quote_symbol}`}
						>
							<TableCell>{`${p.base_symbol}/${p.quote_symbol}`}</TableCell>
							<Spread p={p} market={m}/>
							<TableCell numeric>{`${last}`}</TableCell>
							<TableCell numeric>{`${combVol}`}</TableCell>
						</TableRow>
					);
				}
			)}
		</TableBody>
	);
};

const MarketBody = connect(({ market, searchFilter, deltaY }) => ({ market, searchFilter, deltaY }), actions)(unconnectedMarketBody);

export { MarketBody };