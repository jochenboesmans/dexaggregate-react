import React, { lazy, useContext } from "react";

import { MarketPageDispatchContext, MarketPageStateContext } from "../../../state/contexts/contexts";

const Grid = lazy(() => import(`@material-ui/core/Grid/Grid`));
const Typography = lazy(() => import(`@material-ui/core/Typography/Typography`));
const IconButton = lazy(() => import(`@material-ui/core/IconButton/IconButton`));
const ChevronLeft = lazy(() => import(`@material-ui/icons/ChevronLeft`));
const ChevronRight = lazy(() => import(`@material-ui/icons/ChevronRight`));

const TableNavigation = ({ entriesPerPage, filteredMarketLength }) => {
	const marketPage = useContext(MarketPageStateContext);
	const marketPageDispatch = useContext(MarketPageDispatchContext);

	const handleLeftButtonClick = () => { if (marketPage > 0) marketPageDispatch(`DECREMENT`); };
	const handleRightButtonClick = () => { if (marketPage * entriesPerPage < filteredMarketLength) marketPageDispatch(`INCREMENT`); };

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