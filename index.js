// CURRENCY CONVERTER:
// 1. *takes input of currencies
// 2. *returns amount in diff currencies:
// FROM KES to USD,GBP,EUR
// FROM USD to KES,GBP,EUR

// const apiKey = (https://v6.exchangerate-api.com/v6/7f5cf1ce24390efe658f1161/latest/USD);
//  Example Request: https://v6.exchangerate-api.com/v6/7f5cf1ce24390efe658f1161/latest/USD

import saveConversation from "./api/historyApi.js";
import getRate from "./api/currencyApi.js";
import converter from "./utils/converter.js";

let resultHistory = [];

function loadPage() {

    const saved = localStorage.getItem("conversionHistory");

    if (saved) {
        try {
            resultHistory = JSON.parse(saved)
            renderHistory(); //show history when my page loads
        } catch (error) {
            console.warn("Failed to parse history");
        }
    }
}
loadPage();

document.querySelector('#convertBtn').addEventListener('click', async function () {

    const amountInput = document.querySelector('#amount');
    const startingCurrency = document.querySelector('#startingCurrency');
    const targetCurrency = document.querySelector('#targetCurrency');
    const resultDisplay = document.querySelector('#result');

    const rate = await getRate(startingCurrency, targetCurrency);

    if (rate) {
        let amount = Number(amountInput.value);
        let converted = converter(rate, amount);
        resultDisplay.textContent = converted;
        let startAmnt = startingCurrency.value.toUpperCase();
        let targetAmnt = targetCurrency.value.toUpperCase();

        // save all records from the DOM
        const records = {
            timeStamp: new Date().toLocaleString(),
            savedAmt: amount,
            savedTargetAmt: targetAmnt,
            savedStartAmt: startAmnt,
            savedRate: rate,
            savedResult: Math.round(converted * 100) / 100

        }

        resultHistory.push(records); //push records to the array
        localStorage.setItem("conversionHistory", JSON.stringify(resultHistory)); // Save after adding a single conversion
        // limit history size so it doesnt grow infinitely
        if (resultHistory.length > 50) {
            resultHistory.shift()
        }

        renderHistory();

        saveConversation(records)
            .catch(err => console.warn("failed to save:", err));
    }

});


function renderHistory() {
    const container = document.getElementById('historyList');
    if (!container) {
        console.warn("Missing #historyList in HTML");
        return;
    }

    container.innerHTML = "";

    if (resultHistory.length === 0) {
        container.textContent = "No resultHistory yet.";
        return;
    }

    resultHistory.forEach((conv, i) => {
        const div = document.createElement('div');
        div.textContent = `#${i + 1} ${conv.timeStamp} | ${conv.savedAmt} ${conv.savedStartAmt} → ${conv.savedResult} ${conv.savedTargetAmt} (rate: ${conv.savedRate})`;
        container.appendChild(div);
    });
}



document.getElementById("historyBtn").addEventListener('click', () => {
    renderHistory();
});



