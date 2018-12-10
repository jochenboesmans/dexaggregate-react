import dateFormat from "dateformat";

export const formatPrice = (price) => {
	return (new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumSignificantDigits: 4,
		maximumSignificantDigits: 4,
		useGrouping: 'true'
	}).format(price));
};
export const formatVolume = (volume) => {
	return (new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		useGrouping: 'true'
	}).format(volume));
};
export const formatPercentage = (percentage) => {
	return (new Intl.NumberFormat('en-US', {
		style: 'percent',
		useGrouping: 'true',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(percentage));
};
export const formatTime = (timestamp) =>
	dateFormat(timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT");