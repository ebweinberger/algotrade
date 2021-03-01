import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import WebSocket from 'ws'
const Price = () => {
    const [currentPrice, setCurrentPrice] = useState(0)
    const [symbol, setSymbol] = useState("VXX")
    const [priceTime, setPriceTime] = useState(0)
    let html = "";

    const stringToHTML = function (str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    const extractPrice = (htmlString) => {
        let htmlObj = stringToHTML(htmlString)
        let priceElement = htmlObj.getElementsByClassName("IsqQVc NprOob XcVN5d wT3VGc")[0]
        let price = priceElement.innerText

        return price
    }

    axios.get(`http://localhost:8080/https://www.google.com/search?q=${symbol}`)
        .then(res => {
            setCurrentPrice(extractPrice(res.data))
        })
        .catch(err => {
            console.log(err)
        })

    return (
        <div>
            <p>Current Price of {symbol}: ${currentPrice}</p>
            {/* <p>Time: {convertTime(priceTime)}</p> */}
            {/* <div>{html}</div> */}
        </div>
    )
}

export default Price