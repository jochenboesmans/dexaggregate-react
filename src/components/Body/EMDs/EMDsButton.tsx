import React, {useState, useContext, FC} from "react";

import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";

import {ActivePageDispatchContext} from "../../../state/contexts/contexts";
import {Pair} from "../../../types/market";

interface PropsType {pair: Pair}

const EMDsButton: FC<PropsType> = ({pair}) => {
	const activePageDispatch = useContext(ActivePageDispatchContext);
	const [hover, setHover] = useState(false);

	const innerText = pair ? (hover ? "Back" : `${pair.baseSymbol}/${pair.quoteSymbol}`) : "Back";
	return (
		<Grid
			item
			onMouseLeave={() => setHover(false)}
			onMouseEnter={() => setHover(true)}
		>
			<Button
				fullWidth
				onClick={() => {
					activePageDispatch({type: "RESET"});
				}}
				style={{fontSize: 24, fontWeight: "bold"}}
			>
				{innerText}
			</Button>
		</Grid>
	);
};

export default EMDsButton;