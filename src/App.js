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
	highestCurrentBid,
	lowestCurrentAsk,
	requoteRate,
	volumeWeightedLastTraded
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
		const sortedMarket = _.orderBy(market, [p => combinedVolume(market, p.base_symbol, p.quote_symbol)], ['desc']);
		this.setState({market: sortedMarket});
    }


	renderMarket() {
    	return (
    		<div>
				<Paper>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Token</TableCell>
								<TableCell numeric>Spread</TableCell>
								<TableCell numeric>Last Price</TableCell>
								<TableCell numeric>Volume (24h)</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{_.map(this.state.market,
								p => {
									const innerBid = formatPrice(requoteRate(this.state.market, p.quote_symbol, "DAI",
										highestCurrentBid(this.state.market, p.base_symbol, p.quote_symbol)));
									const innerAsk = formatPrice(requoteRate(this.state.market, p.quote_symbol, "DAI",
										lowestCurrentAsk(this.state.market, p.base_symbol, p.quote_symbol)));
									const last = formatPrice(requoteRate(this.state.market, p.quote_symbol, "DAI",
										volumeWeightedLastTraded(this.state.market, p.base_symbol, p.quote_symbol)));
									const combVol = formatVolume(requoteRate(this.state.market, p.quote_symbol, "DAI",
										combinedVolume(this.state.market, p.base_symbol, p.quote_symbol)));

									return (
										<TableRow key={`${p.base_symbol}/${p.quote_symbol}`}>
											<TableCell>{`${p.quote_symbol}`}</TableCell>
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
