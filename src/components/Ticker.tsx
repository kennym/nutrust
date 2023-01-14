import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBinanceTicker = () => {
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        const fetchTicker = async () => {
            const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=btcusdt`);
            setPrice(response.data.price);
        };
        fetchTicker();
    }, ['btcusdt']);

    return price;
};