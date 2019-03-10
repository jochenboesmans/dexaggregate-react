import React, { useState, lazy, useContext } from "react";

import { ActivePageDispatchContext } from "../../../state/contexts/contexts";

const Button = lazy(() => import(`@material-ui/core/Button/Button`));
const Grid = lazy(() => import(`@material-ui/core/Grid/Grid`));

const PairButton = ({ p }) => {
	const activePageDispatch = useContext(ActivePageDispatchContext);

	const [hover, setHover] = useState(false);
	const innerText = hover ? `Back` : `${p.b}/${p.q}`;
	return (
		<Grid
			item
			onMouseLeave={() => { setHover(false); }}
			onMouseEnter={() => { setHover(true); }}
		>
			<Button
				fullWidth
				onClick={() => {
					activePageDispatch({
						type: `RESET`
					});
				}}
				style={{ fontSize: 24, fontWeight: `bold` }}
			>
				{innerText}
			</Button>
		</Grid>
	);
};

export default PairButton;