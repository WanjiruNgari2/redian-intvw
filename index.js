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
    const tbody = document.getElementById('historyBody');
    if (!tbody) {
        console.warn("Missing #historyBody in HTML");
        return;
    }

    tbody.innerHTML = "";

    if (resultHistory.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem;">No conversions yet.</td></tr>';
        return;
    }

    resultHistory.forEach((conv, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${conv.timeStamp || conv.timestamp || '—'}</td>
            <td>${conv.savedAmt.toLocaleString()} ${conv.savedStartAmt}</td>
            <td class="arrow">→</td>
            <td>${Number(conv.savedResult).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 4})} ${conv.savedTargetAmt}</td>
            <td data-label="Rate">${conv.savedRate.toFixed(6)}</td>
        `;

        tbody.appendChild(row);
    });
}



document.getElementById("historyBtn").addEventListener('click', () => {
    renderHistory();
});



