import React, { useContext, FC } from "react";

import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography/Typography";

import { CurrenciesPageDispatchContext, CurrenciesPageStateContext } from "../../../state/contexts/contexts";

interface PropsType {
	entriesPerPage: number,
	filteredCurrenciesLength: number
}

const CurrenciesTableNavigation: FC<PropsType> = ({ entriesPerPage, filteredCurrenciesLength }) => {
	const currenciesPage = useContext(CurrenciesPageStateContext);
	const currenciesPageDispatch = useContext(CurrenciesPageDispatchContext);

	const handleLeftButtonClick = () => {
		if (currenciesPage > 0) currenciesPageDispatch({ type: "DECREMENT" });
	};
	const handleRightButtonClick = () => {
		if ((currenciesPage * entriesPerPage) + entriesPerPage < filteredCurrenciesLength) currenciesPageDispatch({ type: "INCREMENT" });
	};

	const start = (filteredCurrenciesLength === 0) ? 0 : 1 + (currenciesPage * entriesPerPage);
	const end = Math.min((currenciesPage * entriesPerPage) + entriesPerPage, filteredCurrenciesLength);

	return (
		<Grid
			container
			direction="row"
			alignItems="center"
			justify="center"
			spacing={2}
		>
			<Grid item>
				<IconButton onClick={handleLeftButtonClick}>
					<ChevronLeft/>
				</IconButton>
			</Grid>
			<Grid item>
				<Typography style={{ textAlign: "center" }}>
					{start} - {end} of {filteredCurrenciesLength}
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

export default CurrenciesTableNavigation;