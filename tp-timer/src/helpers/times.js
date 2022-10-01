import moment from 'moment';

export function formatTimeForDisplay(seconds) {
    return moment(seconds * 1000).format('mm:ss.S');
}

export function roundToDecimals(value, decimalPlaces) {
    return Math.round(value * Math.pow(10, decimalPlaces) ) / Math.pow(10, decimalPlaces);
}

export function displayWithSign(value) {
    if (value === undefined) {
        return value;
    }
    
    return value >= 0
        ? "+" + value.toString()
        : value.toString();
}