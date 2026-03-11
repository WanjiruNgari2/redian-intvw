async function getRate(startingCurrency, targetCurrency) {
    const amountInput = document.querySelector('#amount');
    const resultDisplay = document.querySelector('#result');


    // console.log(typeof amountInput.value);
    let amount = Number(amountInput.value);
    // console.log(typeof amount);
    let startAmnt = startingCurrency.value.toUpperCase();
    let targetAmnt = targetCurrency.value.toUpperCase();

    // check user entered a valid number
    if (isNaN(amount)) {
        resultDisplay.textContent = "Enter a valid amount";
        return null;
    }


    const response = await fetch(`https://v6.exchangerate-api.com/v6/7f5cf1ce24390efe658f1161/latest/${startAmnt}`);
    const data = await response.json();

    // console.log(data); 
    if (!data.conversion_rates[targetAmnt]) {
        console.log("Invalid currency");
        return null;
    }

    if (!data || !data.conversion_rates) {
        throw new Error("Invalid API response");
    }
    // console.log("Target:", targetAmnt);
    // console.log("Available keys:", Object.keys(data.conversion_rates));
    let rate = data.conversion_rates[targetAmnt];

    // console.log(rate);
    return rate;

}

export default getRate;