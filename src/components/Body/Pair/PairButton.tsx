import React, { useState, useContext, FC } from "react";

import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";

import { ActivePageDispatchContext } from "../../../state/contexts/contexts";

interface PropsType {
	p: any
}

const PairButton: FC<PropsType> = ({ p }) => {
	const activePageDispatch = useContext(ActivePageDispatchContext);
	const [hover, setHover] = useState(false);

	const innerText = hover ? `Back` : `${p.baseSymbol}/${p.quoteSymbol}`;
	return (
		<Grid
			item
			onMouseLeave={() => { setHover(false); }}
			onMouseEnter={() => { setHover(true); }}
		>
			<Button
				fullWidth
				onClick={() => {
					activePageDispatch({ type: `RESET` });
				}}
				style={{ fontSize: 24, fontWeight: `bold` }}
			>
				{innerText}
			</Button>
		</Grid>
	);
};

export default PairButton;