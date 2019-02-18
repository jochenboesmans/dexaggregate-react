//import dateFormat from "dateformat";

const formatPrice = (price) => {
	const sd = (price) => {
		if (price < 0.01) {
			return 1;
		} else if (price < 0.1) {
			return 2;
		} else if (price < 1) {
			return 3;
		} else {
			return 4;
		}
	};
	if (price < 0.001) {
		return (new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 3,
			minimumFractionDigits: 3,
			useGrouping: "true"
		}).format(price));
	} else {
		return (new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumSignificantDigits: sd(price),
			maximumSignificantDigits: sd(price),
			useGrouping: "true"
		}).format(price));
	}
};

const formatVolume = (volume) => {
	return (new Intl.NumberFormat("en-US", {
		style: "currency", currency: "USD", useGrouping: "true"
	}).format(volume));
};

const formatPercentage = (percentage) => {
	return (new Intl.NumberFormat("en-US", {
		style: "percent", useGrouping: "true", minimumFractionDigits: 2, maximumFractionDigits: 2
	}).format(percentage));
};

//const formatTime = (timestamp) => dateFormat(timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT");

export {
	formatPrice, formatVolume, formatPercentage,
};