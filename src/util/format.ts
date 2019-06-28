const amountOfDigits = (x: number) => (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;

const formatPrice = (price: number) => {
	const sd = (price: number) => amountOfDigits(price / 0.01);
	return (new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumSignificantDigits: sd(price),
		maximumSignificantDigits: sd(price),
		useGrouping: true
	}).format(price));
};

const formatVolume = (volume: number) => {
	return (new Intl.NumberFormat("en-US", {
		style: "currency", currency: "USD", useGrouping: true
	}).format(volume));
};

const formatPercentage = (percentage: number) => {
	return (new Intl.NumberFormat("en-US", {
		style: "percent", useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2
	}).format(percentage));
};

export { formatPrice, formatVolume, formatPercentage };