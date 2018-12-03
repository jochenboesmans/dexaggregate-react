let modelUpdated = false;

const setModelUpdated = (boolean) => modelUpdated = boolean;
const getModelUpdated = () => modelUpdated;

module.exports = {
	getModelUpdated: getModelUpdated,
	setModelUpdated: setModelUpdated
};

