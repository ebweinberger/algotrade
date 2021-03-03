import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import WebSocket from 'ws'
const Price = () => {
    const [currentPrice, setCurrentPrice] = useState(0)
    const [symbol, setSymbol] = useState("VXX")
    const [priceTime, setPriceTime] = useState(0)
    const [secondPrice, setSecondPrice] = useState(0)
    let html = "";

    useEffect(() => {
        const ws = new WebSocket('wss://ws.finnhub.io?token=c0teprv48v6r4maeq8ng')

        ws.addEventListener('open', () => {
            ws.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}))
            console.log('Subscribe sent')
        })

        ws.addEventListener('message', (message) => {
            const tradeData = JSON.parse(message.data)
            if(tradeData.type === "trade"){
                console.log(tradeData.data[0])
                setPriceTime(tradeData.data[0]?.t)
                setCurrentPrice(tradeData.data[0]?.p)
            }else if(tradeData.type === "ping"){
                console.log("Ping!")
            }else{
                console.log(message)
            }
        })
    }, [symbol])

    const getPrice = () => {
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c0teprv48v6r4maeq8ng`)
        .then(res => {
            console.log(res.data?.c)
            setSecondPrice(res.data?.c)
        })
    }

    useEffect(() => {
        setInterval(getPrice, 1067)
    },[])

    
    

    
    
    return (
        <div>
            <p>Current Price of {symbol}: ${currentPrice}</p>
            <p>Per second: ${secondPrice}</p>
            <p>Time: {Date(priceTime)}</p>
        </div>
    )
}

export default Price