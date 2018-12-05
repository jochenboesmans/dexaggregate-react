import React from "react";
import TableCell from "@material-ui/core/TableCell/TableCell";

import {formatPercentage, formatPrice} from "../../../util/formatFunctions";
import {rebaseHighestCurrentBid, rebaseLowestCurrentAsk} from "../../../util/marketFunctions";

const Spread = ({market, p}) => {
	const innerBid = rebaseHighestCurrentBid(market, p.base_symbol, p.quote_symbol, "DAI");
	const innerAsk = rebaseLowestCurrentAsk(market, p.base_symbol, p.quote_symbol, "DAI");
	const spreadRatioDifference = (innerAsk / innerBid) - 1;
	const fInnerBid = formatPrice(innerBid);
	const fInnerAsk = formatPrice(innerAsk);
	const fSpreadPercentage = formatPercentage(spreadRatioDifference);

	const arbitrageLimit = -0.01;
	if (spreadRatioDifference <= arbitrageLimit) {
		return <TableCell style={{color: "red"}} numeric>{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>
	} else {
		return <TableCell numeric>{`${fInnerBid} - ${fInnerAsk} (${fSpreadPercentage})`}</TableCell>

	}
};

export default Spread;