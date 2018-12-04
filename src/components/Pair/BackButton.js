import React from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {pages} from "../../model/pages";
import * as actions from "../../actions";

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	}
});

function BackButton(){
	console.log(pages);
	return (
		<div>
			<Button onClick={() => {/*{this.props.setPage(pages.MAIN)}*/}} variant="contained" >
				Back to {{/*pages.MAIN.name*/}}
			</Button>
		</div>
	);
}

export default connect(null, actions)(withStyles(styles)(BackButton()));