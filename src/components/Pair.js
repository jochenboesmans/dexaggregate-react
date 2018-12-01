import React, {Component} from "react";
import {connect} from 'react-redux';

import {pages} from "../model/pages";

import * as actions from "../actions";

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import _ from "lodash";
import {
	rebaseCombinedVolume,
	rebaseHighestCurrentBid,
	rebaseLastPrice,
	rebaseLowestCurrentAsk, rebaseRate
} from "../util/marketFunctions";

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});

const formatPrice = (price) => {
	return (new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumSignificantDigits: 4,
		maximumSignificantDigits: 4,
		useGrouping: 'true'
	}).format(price));
};
const formatVolume = (volume) => {
	return (new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		useGrouping: 'true'
	}).format(volume));
};

class Pair extends Component {
	render() {
		const p = this.props.activePage.pair;
		const market = this.props.market;
		const sortedMarketData = _.orderBy(p.market_data, [emd => emd.volume], "desc");
		return (
			<div>
				<button onClick={() => this.props.setPage(pages.MAIN)}>Back to MAIN</button>
				<Typography variant="title" component="title">
					{`${p.base_symbol}/${p.quote_symbol}`}
				</Typography>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Exchange</TableCell>
								<TableCell numeric>Quote Token Current Spread [DAI]</TableCell>
								<TableCell numeric>Quote Token Last Price [DAI]</TableCell>
								<TableCell numeric>Volume (24h) [DAI]</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{_.map(sortedMarketData,
								emd => {
									const innerBid = formatPrice(rebaseRate(market, p.base_symbol, p.quote_symbol,"DAI", emd.current_bid));
									const innerAsk = formatPrice(rebaseRate(market, p.base_symbol, p.quote_symbol, "DAI", emd.current_ask));
									const last = formatPrice(rebaseRate(market, p.base_symbol, p.quote_symbol, "DAI", emd.last_traded));
									const combVol = formatVolume(rebaseRate(market, p.base_symbol, p.quote_symbol, "DAI", emd.volume));

									return (
										<TableRow onClick={() => this.props.setPage({...pages.PAIR, pair: p})} key={emd.exchange.ID}>
											<TableCell>{emd.exchange.name}</TableCell>
											<TableCell numeric>{`${innerBid} - ${innerAsk}`}</TableCell>
											<TableCell numeric>{`${last}`}</TableCell>
											<TableCell numeric>{`${combVol}`}</TableCell>
										</TableRow>
									);
								}
							)}
						</TableBody>
					</Table>
				</Paper>

			</div>
		)
	}
}

function mapStateToProps({market, activePage}) {
	return {market, activePage};
}

export default connect(mapStateToProps, actions)(Pair);