let modelNeedsBroadcast = false;

const getModelNeedsBroadcast = () => modelNeedsBroadcast, setModelNeedsBroadcast = (boolean) => modelNeedsBroadcast = boolean;

module.exports = {
	getModelNeedsBroadcast,
	setModelNeedsBroadcast
};
