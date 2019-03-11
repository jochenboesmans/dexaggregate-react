import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography/Typography";

import { MarketPageDispatchContext, MarketPageStateContext } from "../../../state/contexts/contexts";

const TableNavigation = ({ entriesPerPage, filteredMarketLength }) => {
	const marketPage = useContext(MarketPageStateContext);
	const marketPageDispatch = useContext(MarketPageDispatchContext);

	const handleLeftButtonClick = () => {
		if (marketPage > 0) marketPageDispatch({ type: `DECREMENT` });
	};
	const handleRightButtonClick = () => {
		if ((marketPage * entriesPerPage) + entriesPerPage < filteredMarketLength) marketPageDispatch({ type: `INCREMENT` });
	};

	const start = (filteredMarketLength === 0) ? 0 : 1 + (marketPage * entriesPerPage);
	const end = Math.min((marketPage * entriesPerPage) + entriesPerPage, filteredMarketLength);

	return (
		<Grid
			container
			direction="row"
			alignItems="center"
			justify="center"
			spacing={8}
		>
			<Grid item>
				<IconButton onClick={handleLeftButtonClick}>
					<ChevronLeft/>
				</IconButton>
			</Grid>
			<Grid item>
				<Typography
					style={{ textAlign: `center` }}
					variant="caption"
				>
					{start} - {end} of {filteredMarketLength}
				</Typography>
			</Grid>
			<Grid item>
				<IconButton onClick={handleRightButtonClick}>
					<ChevronRight/>
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default TableNavigation;