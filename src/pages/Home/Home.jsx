import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const { allCoin, currency, loading, error, retryFetch } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [length, setLength] = useState(0);
    const [pageStart,setPageStart]=useState(0);
    const [pageEnd,setPageEnd]=useState(10);
    const [input, setInput] = useState('');

    const inputHandler = (event) => {
        setInput(event.target.value);
        if (event.target.value === "") {
            setDisplayCoin(allCoin);
        }
    }

    const searchHandler = async (event) => {
        event.preventDefault();
        const coins = allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase()) ||
                   item.symbol.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins);
    }

    const movePrev = () => {
            if(pageStart>=10){
                setPageStart(pageStart-10)
                setPageEnd(pageEnd-10) 
            }
        }

    const moveNext = () => {
        if(pageEnd<length){
                setPageStart(pageStart+10)
                setPageEnd(pageEnd+10) 
            }
    }

    useEffect(() => {
        setDisplayCoin(allCoin);
        setLength(allCoin.length);
    }, [allCoin])

    if (loading) {
        return (
            <div className='spinner'>
                <div className="spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='error'>
                <p>Error loading cryptocurrency data: {error}</p>
                <button className="retry-button" onClick={retryFetch}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className='home'>
            <div className="hero">
                <h1>Largest <br /> Crypto Marketplace</h1>
                <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
                <form onSubmit={searchHandler}>
                    <input 
                        onChange={inputHandler} 
                        list='coinlist' 
                        value={input} 
                        type="text" 
                        placeholder='Search crypto..' 
                    />
                    <datalist id='coinlist'>
                        {allCoin.map((item, index) => (
                            <option key={index} value={item.name} />
                        ))}
                    </datalist>
                    <button type="submit">Search</button>
                </form>
            </div>
            
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className='market-cap'>Market Cap</p>
                </div>
                {displayCoin.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                        <p>No cryptocurrencies found matching your search.</p>
                    </div>
                ) : (
                    displayCoin.slice(pageStart, pageEnd).map((item, index) => (
                        <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div>
                                <img src={item.image} alt={item.name} />
                                <p>{item.name + " - " + item.symbol.toUpperCase()}</p>
                            </div>
                            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {item.price_change_percentage_24h > 0 ? "+" : ""}
                                {Math.round(item.price_change_percentage_24h * 100) / 100}%
                            </p>
                            <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                )}
            </div>
            <div className="pagination">
                <button className="btn-active" onClick={()=>movePrev()}>Prev</button>
                <button className="btn-active" onClick={()=>moveNext()}>Next</button>
            </div>
        </div>
    )
}

export default Home;