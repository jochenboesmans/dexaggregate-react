import React, {FC, lazy, Suspense, useContext} from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { ViewportStateContext } from "../state/contexts/contexts";

const Footer = lazy(() => import("./Footer/Footer"));
const Header = lazy(() => import("./Header/Header"));
const Body = lazy(() => import("./Body/Body"));

const WithGrid: FC = () => {
	const { width: vw } = useContext(ViewportStateContext);
	const mainGridWidth = vw > 1300 ? "50vw" : "95vw";
	const relItemWidth = "90%";
	const spacerVH = { BIG: "1vh", SMALL: "0.5vh"};
	return (
		<Grid container direction="column" alignItems="center">
			<Grid container direction="column" style={{ width: `${mainGridWidth}` }}>
				<Grid item style={{ height: `${spacerVH.BIG}` }}></Grid>
				<Paper>
					<Grid item style={{ height: `${spacerVH.SMALL}` }}></Grid>
					<Grid item>
						<Grid container direction="column" alignItems="center" spacing={1}>
							<Grid item style={{ width: `${relItemWidth}` }}>
								<Suspense fallback={<div>Loading Header...</div>}>
									<Header/>
								</Suspense>
							</Grid>
							<Grid item style={{ width: `${relItemWidth}` }}>
								<Suspense fallback={<div>Loading Body...</div>}>
									<Body/>
								</Suspense>
							</Grid>
							<Grid item style={{ width: `${relItemWidth}` }}>
								<Suspense fallback={<div>Loading Footer...</div>}>
									<Footer/>
								</Suspense>
							</Grid>
						</Grid>
					</Grid>
					<Grid item style={{ height: `${spacerVH.SMALL}` }}></Grid>
				</Paper>
				<Grid item style={{ height: `${spacerVH.BIG}` }}></Grid>
			</Grid>
		</Grid>
	);
};

export default WithGrid;