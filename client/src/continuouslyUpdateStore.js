import { subscribeToSocketBroadcasts } from "./websocketclient";
import { updateTime, updateViewport } from "./actions";

const continuouslyUpdateStore = (dispatch) => {
    setInterval(() => updateTime()(dispatch), 100);
    window.onresize = () => updateViewport()(dispatch);
    subscribeToSocketBroadcasts(dispatch);
};

export { continuouslyUpdateStore };