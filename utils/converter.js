function converter(rate, amount) {

    if (amount === null || amount === undefined || rate === null || rate === undefined) {
        return "invalid";
    }

    const isAmountEmptyString = typeof amount === "string" && amount.trim() === "";
    const isRateEmptyString = typeof rate === "string" && rate.trim() === "";

    if (isAmountEmptyString || isRateEmptyString) {
        return "invalid";
    }

    amount = Number(amount);
    rate = Number(rate);

    if (Number.isNaN(rate) || isNaN(amount)) {
        return "invalid";
    }

    if (!Number.isFinite(amount) || !Number.isFinite(rate)) {
        return "invalid";
    }

    if (amount >= 1e10 || rate >= 1e10) {
        return "number is invalid"; //big numbers
    }

    if (amount < 0 || rate < 0) {
        return "invalid"; //negatives
    }

    if (amount > 0 && amount < 0.001) {
        return "invalid"; // very small decimals
    }

    const converted = amount * rate;
    return Math.round(converted * 100) / 100;

}
export default converter;


