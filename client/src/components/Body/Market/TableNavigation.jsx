import React, { lazy } from "react";
import { connect } from "react-redux";

const Grid = lazy(() => import("@material-ui/core/Grid/Grid"));
const Typography = lazy(() => import("@material-ui/core/Typography/Typography"));
const IconButton = lazy(() => import("@material-ui/core/IconButton/IconButton"));
const ChevronLeft = lazy(() => import("@material-ui/icons/ChevronLeft"));
const ChevronRight = lazy(() => import("@material-ui/icons/ChevronRight"));


const unconnectedTableNavigation = ({ filteredMarketLength, deltaY, setDeltaY }) => {
    const handleLeftButtonClick = () => { if(deltaY - 10 >= 0) setDeltaY(deltaY - 10) };
    const handleRightButtonClick = () => { if(deltaY + 10 < filteredMarketLength) setDeltaY(deltaY + 10) };

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={8}
        >
            <Grid item>
                <IconButton
                    onClick={handleLeftButtonClick}>
                    <ChevronLeft/>
                </IconButton>
            </Grid>
            <Grid item>
                <Typography
                    style={{textAlign: "center"}}
                    variant="caption">
                    {1 + deltaY} - {Math.min(deltaY + 10, filteredMarketLength)} of {filteredMarketLength}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton
                    onClick={handleRightButtonClick}>
                    <ChevronRight/>
                </IconButton>
            </Grid>
        </Grid>
    );
};

const TableNavigation = connect(({ deltaY, setDeltaY }) => ({ deltaY, setDeltaY }))(unconnectedTableNavigation);
export default TableNavigation;