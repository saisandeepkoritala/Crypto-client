import { createContext, useEffect, useState } from "react";

// Create a context for Coin data
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    // API key for accessing CoinGecko API
    const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

    // State to store all coin data
    const [allCoin, setAllCoin] = useState([]);
    // State to store selected currency
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });
    // State to store loading status
    const [loading, setLoading] = useState(false);
    // State to store error message
    const [error, setError] = useState(null);

    // Function to fetch all coin data from CoinGecko API
    const fetchAllCoin = async () => {
        setLoading(true);
        setError(null);

        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': API_KEY }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setAllCoin(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Retry function for error handling
    const retryFetch = () => {
        fetchAllCoin();
    };

    // Fetch coin data whenever the currency changes
    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    // Context value to be provided to consumers
    const contextValue = {
        allCoin, 
        currency, 
        setCurrency, 
        loading, 
        error, 
        API_KEY,
        retryFetch
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;