import React, { useState, useContext, useEffect } from 'react'
import './MarketData.css'
import { CoinContext } from '../../../context/CoinContext'
import { Link } from 'react-router-dom'

const MarketData = () => {
    const { allCoin, currency, loading, error } = useContext(CoinContext);
    const [displayCoins, setDisplayCoins] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState('market_cap_rank');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterBy, setFilterBy] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(50);

    useEffect(() => {
        if (allCoin.length > 0) {
            let filtered = [...allCoin];

            // Apply search filter
            if (searchInput) {
                filtered = filtered.filter(coin =>
                    coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
                );
            }

            // Apply category filter
            if (filterBy !== 'all') {
                switch (filterBy) {
                    case 'gainers':
                        filtered = filtered.filter(coin => coin.price_change_percentage_24h > 0);
                        break;
                    case 'losers':
                        filtered = filtered.filter(coin => coin.price_change_percentage_24h < 0);
                        break;
                    case 'top100':
                        filtered = filtered.filter(coin => coin.market_cap_rank <= 100);
                        break;
                    default:
                        break;
                }
            }

            // Apply sorting
            filtered.sort((a, b) => {
                let aValue = a[sortBy];
                let bValue = b[sortBy];

                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });

            setDisplayCoins(filtered);
        }
    }, [allCoin, searchInput, sortBy, sortOrder, filterBy]);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
        setCurrentPage(1);
    };

    // Pagination
    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = displayCoins.slice(indexOfFirstCoin, indexOfLastCoin);
    const totalPages = Math.ceil(displayCoins.length / coinsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatCurrency = (amount) => {
        if (amount >= 1e12) {
            return `${currency.symbol}${(amount / 1e12).toFixed(2)}T`;
        } else if (amount >= 1e9) {
            return `${currency.symbol}${(amount / 1e9).toFixed(2)}B`;
        } else if (amount >= 1e6) {
            return `${currency.symbol}${(amount / 1e6).toFixed(2)}M`;
        } else if (amount >= 1e3) {
            return `${currency.symbol}${(amount / 1e3).toFixed(2)}K`;
        } else {
            return `${currency.symbol}${amount.toLocaleString()}`;
        }
    };

    const formatPercentage = (percentage) => {
        if (percentage === null || percentage === undefined) return 'N/A';
        return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
    };

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
                <p>Error loading market data: {error}</p>
            </div>
        );
    }

    return (
        <div className='market-data'>
            <div className="market-data-hero">
                <h1>Real-Time Market Data</h1>
                <p>Get instant access to live cryptocurrency prices, market caps, and trading volumes from over 10,000+ digital assets</p>
                
                <div className="market-stats">
                    <div className="stat-item">
                        <span className="stat-value">{allCoin.length}</span>
                        <span className="stat-label">Cryptocurrencies</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">500+</span>
                        <span className="stat-label">Exchanges</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value live">🔴 LIVE</span>
                        <span className="stat-label">Real-time Updates</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">24/7</span>
                        <span className="stat-label">Market Monitoring</span>
                    </div>
                </div>
            </div>

            <div className="market-controls">
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search cryptocurrencies..."
                        value={searchInput}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                
                <div className="filter-section">
                    <select value={filterBy} onChange={handleFilterChange} className="filter-select">
                        <option value="all">All Coins</option>
                        <option value="gainers">Top Gainers</option>
                        <option value="losers">Top Losers</option>
                        <option value="top100">Top 100</option>
                    </select>
                    
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                        <option value="market_cap_rank">Rank</option>
                        <option value="current_price">Price</option>
                        <option value="market_cap">Market Cap</option>
                        <option value="price_change_percentage_24h">24h Change</option>
                        <option value="total_volume">Volume</option>
                    </select>
                </div>
            </div>

            <div className="market-table-container">
                <div className="market-table">
                    <div className="table-header">
                        <div className="header-cell" onClick={() => handleSort('market_cap_rank')}>
                            Rank {sortBy === 'market_cap_rank' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="header-cell" onClick={() => handleSort('name')}>
                            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="header-cell" onClick={() => handleSort('current_price')}>
                            Price {sortBy === 'current_price' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="header-cell" onClick={() => handleSort('price_change_percentage_24h')}>
                            24h Change {sortBy === 'price_change_percentage_24h' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="header-cell volume" onClick={() => handleSort('total_volume')}>
                            Volume {sortBy === 'total_volume' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="header-cell market-cap" onClick={() => handleSort('market_cap')}>
                            Market Cap {sortBy === 'market_cap' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                        <div className="header-cell chart">Chart</div>
                    </div>

                    <div className="table-body">
                        {currentCoins.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                                <p>No cryptocurrencies found matching your criteria.</p>
                            </div>
                        ) : (
                            currentCoins.map((coin, index) => (
                                <Link 
                                    to={`/coin/${coin.id}`} 
                                    key={coin.id} 
                                    className="table-row"
                                >
                                    <div className="cell rank">{coin.market_cap_rank || 'N/A'}</div>
                                    <div className="cell name">
                                        <img src={coin.image} alt={coin.name} />
                                        <div className="coin-info">
                                            <span className="coin-name">{coin.name}</span>
                                            <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className="cell price">
                                        {currency.symbol}{coin.current_price?.toLocaleString() || 'N/A'}
                                    </div>
                                    <div className={`cell change ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                                        {formatPercentage(coin.price_change_percentage_24h)}
                                    </div>
                                    <div className="cell volume">
                                        {formatCurrency(coin.total_volume || 0)}
                                    </div>
                                    <div className="cell market-cap">
                                        {formatCurrency(coin.market_cap || 0)}
                                    </div>
                                    <div className="cell chart">
                                        <div className="mini-chart">
                                            <svg width="100" height="40" viewBox="0 0 100 40">
                                                <polyline
                                                    fill="none"
                                                    stroke={coin.price_change_percentage_24h > 0 ? "#00d515" : "#ff4646"}
                                                    strokeWidth="2"
                                                    points="0,20 25,15 50,25 75,10 100,30"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button 
                        className="pagination-btn"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    
                    <div className="page-numbers">
                        {[...Array(Math.min(5, totalPages))].map((_, index) => {
                            const pageNumber = Math.max(1, currentPage - 2) + index;
                            if (pageNumber <= totalPages) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                        onClick={() => paginate(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            }
                            return null;
                        })}
                    </div>
                    
                    <button 
                        className="pagination-btn"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            <div className="features-showcase">
                <h2>Market Data Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Real-time Updates</h3>
                        <p>Get live price updates every second with instant market data from over 500 exchanges worldwide.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Advanced Analytics</h3>
                        <p>Comprehensive market analysis with historical data, volume tracking, and market cap calculations.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Smart Search</h3>
                        <p>Powerful search and filtering capabilities to find exactly the cryptocurrencies you're looking for.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3>Price Charts</h3>
                        <p>Interactive charts and graphs showing price movements, trends, and technical indicators.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔔</div>
                        <h3>Price Alerts</h3>
                        <p>Set custom price alerts and get notified when your favorite cryptocurrencies hit target prices.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Mobile Ready</h3>
                        <p>Fully responsive design that works perfectly on all devices, from desktop to mobile.</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Ready to Track the Markets?</h2>
                <p>Join thousands of traders who rely on our real-time market data for their investment decisions</p>
                <div className="cta-buttons">
                    <Link to="/signup" className="primary-cta">Start Free Trial</Link>
                    <Link to="/pricing" className="secondary-cta">View Pricing</Link>
                </div>
            </div>
        </div>
    );
};

export default MarketData;