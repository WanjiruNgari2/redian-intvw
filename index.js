// CURRENCY CONVERTER:
// 1. *takes input of currencies
// 2. *returns amount in diff currencies:
// FROM KES to USD,GBP,EUR
// FROM USD to KES,GBP,EUR

const { http } = require("get-uri/dist/http");

// required: // 
// api: https://open.er-api.com/v6/latest 
const apiKey = "7f5cf1ce24390efe658f1161";
//  Example Request: https://v6.exchangerate-api.com/v6/7f5cf1ce24390efe658f1161/latest/USD


const input = document.querySelector('.inputBtn').addEventListener('click');
const output = document.querySelector('.outputBtn').addEventListener('click');

const promised = async dataFetched (req, res) {
    try {
        res = await fetch(`https://v6.exchangerate-api.com/v6/{apiKey}`);
        let raw = res.json();
        return raw;

    } catch (error) {
        console.log(Error: "error ocurred")

    }
    promised()



    const promises = async dataFetch (req, res) {
        try {
            res = await fetch(`https://v6.exchangerate-api.com/v6/{apiKey}`);
             if (res.result === "success") {
                {
                    "method": "GET",
                "content": "application/json"
                }

            }
            let raw = res.json();
            return raw;


        } catch (error) {
            console.log(Error: "error ocurred")

        }
        promised()

    }
