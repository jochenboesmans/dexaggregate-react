/* External libraries */
import React, { Component } from 'react';
import _ from "lodash";
import axios from "axios";

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

/* Stylesheet */

import {
	combinedVolume,
	rebaseCombinedVolume,
	rebaseHighestCurrentBid,
	rebaseLastPrice,
	rebaseLowestCurrentAsk, rebaseRate, totalCombinedVolume,
} from "./util/marketFunctions";

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





/**
 * Simple React app that displays market data from various exchanges.
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
			market: {}
        });
    }
    async componentDidMount() {
		const result = await axios.get("/api/market");
		const market = result.data;
		const sortedMarket = _.orderBy(market, [p => rebaseCombinedVolume(market, p.base_symbol, p.quote_symbol, "DAI")], ['desc']);
		this.setState({market: sortedMarket});
    }


	renderMarket() {
    	return (
    		<div>
				<Paper>
					Combined Volume (24h): {formatVolume(_.sumBy(this.state.market, p => rebaseCombinedVolume(this.state.market, p.base_symbol, p.quote_symbol, "DAI")))}
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Base Token / Quote Token</TableCell>
								<TableCell numeric>Quote Token Current Spread ($)</TableCell>
								<TableCell numeric>Quote Token Last Price ($)</TableCell>
								<TableCell numeric>Volume (24h)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{_.map(this.state.market,
								p => {
									const innerBid = formatPrice(rebaseHighestCurrentBid(this.state.market, p.base_symbol, p.quote_symbol, "DAI"));
									const innerAsk = formatPrice(rebaseLowestCurrentAsk(this.state.market, p.base_symbol, p.quote_symbol, "DAI"));
									const last = formatPrice(rebaseLastPrice(this.state.market, p.base_symbol, p.quote_symbol, "DAI"));
									const combVol = formatVolume(rebaseCombinedVolume(this.state.market, p.base_symbol, p.quote_symbol, "DAI"));

									return (
										<TableRow key={`${p.base_symbol}/${p.quote_symbol}`}>
											<TableCell>{`${p.base_symbol}/${p.quote_symbol}`}</TableCell>
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

    render() {
    	console.log(this.state);
        return (
            <div className="App" style={{textAlign: "center"}}>
                {this.renderMarket()}
            </div>
        );
    }
}

export default withStyles(styles)(App);
