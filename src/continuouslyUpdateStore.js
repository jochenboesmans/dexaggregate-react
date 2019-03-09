import { subscribeToSocketBroadcasts, unsubscribeFromSocketBroadcasts } from "./websocketclient";
import { updateTime, updateViewport } from "./actions";

const continuouslyUpdateStore = (dispatch) => {
	setInterval(() => updateTime()(dispatch), 100);
	window.onresize = () => updateViewport()(dispatch);
	const socket = subscribeToSocketBroadcasts(dispatch);
	window.onbeforeunload = () => {
		unsubscribeFromSocketBroadcasts(dispatch, socket);
		return null;
	};
};

export { continuouslyUpdateStore };