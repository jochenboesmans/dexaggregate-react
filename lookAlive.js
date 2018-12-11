const axios = require("axios");

module.exports = () => {
	setInterval(() => poke(), intervalInSeconds * 1000)
};

const intervalInSeconds = 60;

const poke = async () => {
	const poked = await axios.get("/");
};