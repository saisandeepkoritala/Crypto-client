import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineCart/LineCart';

const Coin = () => {
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState(null);
    const [historicalData, setHistoricalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currency, API_KEY } = useContext(CoinContext);

    const fetchCoinData = async () => {
        const options = {
            method: 'GET',
            headers: { 
                accept: 'application/json', 
                'x-cg-demo-api-key': API_KEY 
            }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCoinData(data);
        } catch (err) {
            console.error('Error fetching coin data:', err);
            setError(err.message || 'Failed to fetch coin data');
        }
    }

    const fetchHistoricalData = async () => {
        const options = {
            method: 'GET',
            headers: { 
                accept: 'application/json', 
                'x-cg-demo-api-key': API_KEY 
            }
        };

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, 
                options
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setHistoricalData(data);
        } catch (err) {
            console.error('Error fetching historical data:', err);
            setError(err.message || 'Failed to fetch historical data');
        }
    }

    const fetchAllData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            await Promise.all([fetchCoinData(), fetchHistoricalData()]);
        } catch (err) {
            setError('Failed to load coin information');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (coinId) {
            fetchAllData();
        }
    }, [coinId, currency])

    if (loading) {
        return (
            <div className='spinner'>
                <div className="spin"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='error'>
                <p>Error: {error}</p>
                <button className="retry-button" onClick={fetchAllData}>
                    Try Again
                </button>
            </div>
        )
    }

    if (!coinData) {
        return (
            <div className='error'>
                <p>Coin not found</p>
            </div>
        )
    }

    return (
        <div className='coin'>
            <div className="coin-name">
                <img src={coinData.image?.large} alt={coinData.name} />
                <p><b>{coinData.name} ({coinData.symbol?.toUpperCase()})</b></p>
            </div>
            
            {historicalData && (
                <div className="coin-chart">
                    <LineChart historicalData={historicalData} />
                </div>
            )}

            <div className="coin-info">
                <ul>
                    <li>Crypto Market Rank</li>
                    <li>{coinData.market_cap_rank || 'N/A'}</li>
                </ul>
                <ul>
                    <li>Current Price</li>
                    <li>
                        {currency.symbol} {coinData.market_data?.current_price?.[currency.name]?.toLocaleString() || 'N/A'}
                    </li>
                </ul>
                <ul>
                    <li>Market cap</li>
                    <li>
                        {currency.symbol} {coinData.market_data?.market_cap?.[currency.name]?.toLocaleString() || 'N/A'}
                    </li>
                </ul>
                <ul>
                    <li>24 Hour high</li>
                    <li>
                        {currency.symbol} {coinData.market_data?.high_24h?.[currency.name]?.toLocaleString() || 'N/A'}
                    </li>
                </ul>
                <ul>
                    <li>24 Hour low</li>
                    <li>
                        {currency.symbol} {coinData.market_data?.low_24h?.[currency.name]?.toLocaleString() || 'N/A'}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Coin