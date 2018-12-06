import React, {Component} from "react";
import {connect} from 'react-redux';

import {pages} from "../../model/pages";

import {
	formatPrice, formatPercentage
} from "../../util/formatFunctions";

import * as actions from "../../actions";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/styles';


import _ from "lodash";

import {rebaseRate} from "../../util/marketFunctions";

import Grid from "@material-ui/core/Grid/Grid";

const styles = {
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 48,
		padding: '0 30px',
	},
};

class Pair extends Component {
	render() {
		const pair = this.props.activePage.pair;
		const market = this.props.market.market;
		const p = _.find(market, pairInMarket => pairInMarket.base_symbol === pair.base_symbol && pairInMarket.quote_symbol === pair.quote_symbol);
		const sortedMarketData = _.orderBy(p.market_data, [emd => emd.volume], "desc");
		return (
			<div>
				<Grid
					container
					direction="column"
					justify="center"
					spacing={8}
					alignItems="center"
				>
					<Grid item>
						<Button className="root" onClick={() => {this.props.setPage(pages.MAIN)}}>
							Back
						</Button>
					</Grid>
					<Grid item>
						<Typography variant="h4" align="center">
							{`${p.base_symbol}/${p.quote_symbol}`}
						</Typography>
					</Grid>
					<Grid item>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography style={{color: "black", fontWeight: "bold"}}>Exchange</Typography>
									</TableCell>
									<TableCell numeric>
										<Typography style={{color: "black", fontWeight: "bold"}}>Current Spread of {p.quote_symbol} [DAI]</Typography>
									</TableCell>
									<TableCell numeric>
										<Typography style={{color: "black", fontWeight: "bold"}}>Last Price of {p.quote_symbol} [DAI]</Typography>
									</TableCell>
									<TableCell numeric>
										<Typography style={{color: "black", fontWeight: "bold"}}>Volume (24h) [DAI]</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{_.map(sortedMarketData,
									emd => {
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
									}
								)}
							</TableBody>
						</Table>
					</Grid>
				</Grid>
			</div>
		);
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

function mapStateToProps({market, activePage}) {
	return {market, activePage};
}

export default connect(mapStateToProps, actions)(withStyles(styles)(Pair));