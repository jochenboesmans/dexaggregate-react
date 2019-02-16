import TableBody from "@material-ui/core/TableBody/TableBody";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableRow from "@material-ui/core/TableRow/TableRow";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../../actions";
import { pages } from "../../../../model/pages";
import { formatPrice, formatVolume } from "../../../../util/formatFunctions";
import { Spread } from "./Spread";

const unconnectedMarketBody = ({ market, searchFilter, deltaY, setDeltaY, setPage, setSearchFilter }) => {
	// TODO: Replace by suspense
	if(!market.market) {
		return null;
	}
	const m = market.market;
	const orderedMarket = _.orderBy(m, [p => _.reduce(p.market_data, (sum, emd) => {
		return sum + emd.volume_dai;
	}, 0)], ["desc"]);
	const filteredMarket = searchFilter ? _.filter(orderedMarket, p => p.base_symbol.includes(searchFilter.toUpperCase()) || p.quote_symbol.includes(searchFilter.toUpperCase()) || _.find(p.market_data, emd => emd.exchangeID.includes(searchFilter.toUpperCase()))) : orderedMarket;
	const start = 0;
	const end = 10;
	const slicedMarket = filteredMarket.slice(start + deltaY, end + deltaY);
	return (<TableBody onWheel={(e) => {
			if(e.deltaY < 0 && deltaY > 9) {
				setDeltaY(deltaY - 10);
			} else if(e.deltaY > 0 && (deltaY < Object.keys(filteredMarket).length - 10)) {
				setDeltaY(deltaY + 10);
			}

		}}>
			{_.map(slicedMarket, p => {
				const combinedVolume = _.reduce(p.market_data, (sum, emd) => sum + emd.volume_dai, 0);
				const weightedSumLastTraded = _.reduce(p.market_data, (sum, emd) => sum + (emd.volume_dai * emd.last_traded_dai), 0);
				const volumeWeightedLastTraded = (weightedSumLastTraded / combinedVolume) || 0;

				const formattedVolumeWeightedLastTraded = formatPrice(volumeWeightedLastTraded);
				const formattedCombinedVolume = formatVolume(combinedVolume);

				return (<TableRow hover
				                  onClick={() => {
					                  setPage({
						                          ...pages.PAIR,
						                          pair: p
					                          });
					                  setSearchFilter(null);
				                  }}
				                  key={`${p.base_symbol}/${p.quote_symbol}`}
					>
						<TableCell>{`${p.base_symbol}/${p.quote_symbol}`}</TableCell>
						<Spread p={p} />
						<TableCell align="right">{`${formattedVolumeWeightedLastTraded}`}</TableCell>
						<TableCell align="right">{`${formattedCombinedVolume}`}</TableCell>
					</TableRow>);
			})}
		</TableBody>);
};

const MarketBody = connect(({ market, searchFilter, deltaY }) => ({
	market,
	searchFilter,
	deltaY
}), actions)(unconnectedMarketBody);

export { MarketBody };