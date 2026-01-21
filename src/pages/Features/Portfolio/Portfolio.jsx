import React, { useState, useContext, useEffect } from 'react'
import './Portfolio.css'
import { CoinContext } from '../../../context/CoinContext'
import { Link } from 'react-router-dom'

const Portfolio = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [portfolios, setPortfolios] = useState([]);
    const [activePortfolio, setActivePortfolio] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

    // Mock portfolio data
    useEffect(() => {
        const mockPortfolios = [
            {
                id: 1,
                name: "Main Portfolio",
                totalValue: 45230.50,
                dayChange: 12.5,
                dayChangeValue: 1247.80,
                holdings: [
                    { 
                        coinId: 'bitcoin', 
                        symbol: 'BTC', 
                        name: 'Bitcoin',
                        amount: 0.5, 
                        avgBuyPrice: 42000,
                        currentPrice: 43000,
                        value: 21500, 
                        change: 8.2,
                        allocation: 47.5
                    },
                    { 
                        coinId: 'ethereum', 
                        symbol: 'ETH', 
                        name: 'Ethereum',
                        amount: 8.2, 
                        avgBuyPrice: 1800,
                        currentPrice: 1900,
                        value: 15580, 
                        change: 15.7,
                        allocation: 34.4
                    },
                    { 
                        coinId: 'cardano', 
                        symbol: 'ADA', 
                        name: 'Cardano',
                        amount: 2500, 
                        avgBuyPrice: 0.32,
                        currentPrice: 0.325,
                        value: 812.50, 
                        change: -2.1,
                        allocation: 1.8
                    },
                    { 
                        coinId: 'solana', 
                        symbol: 'SOL', 
                        name: 'Solana',
                        amount: 45, 
                        avgBuyPrice: 155,
                        currentPrice: 162,
                        value: 7290, 
                        change: 4.5,
                        allocation: 16.1
                    }
                ],
                performance: {
                    totalInvested: 38500,
                    totalProfit: 6730.50,
                    profitPercentage: 17.5,
                    bestPerformer: 'ETH',
                    worstPerformer: 'ADA'
                }
            },
            {
                id: 2,
                name: "DeFi Portfolio",
                totalValue: 12450.30,
                dayChange: -3.2,
                dayChangeValue: -412.15,
                holdings: [
                    { 
                        coinId: 'uniswap', 
                        symbol: 'UNI', 
                        name: 'Uniswap',
                        amount: 150, 
                        avgBuyPrice: 25,
                        currentPrice: 24.5,
                        value: 3675, 
                        change: -2.0,
                        allocation: 29.5
                    },
                    { 
                        coinId: 'aave', 
                        symbol: 'AAVE', 
                        name: 'Aave',
                        amount: 25, 
                        avgBuyPrice: 180,
                        currentPrice: 175,
                        value: 4375, 
                        change: -2.8,
                        allocation: 35.1
                    },
                    { 
                        coinId: 'compound-governance-token', 
                        symbol: 'COMP', 
                        name: 'Compound',
                        amount: 12, 
                        avgBuyPrice: 220,
                        currentPrice: 215,
                        value: 2580, 
                        change: -2.3,
                        allocation: 20.7
                    }
                ],
                performance: {
                    totalInvested: 13200,
                    totalProfit: -749.70,
                    profitPercentage: -5.7,
                    bestPerformer: 'UNI',
                    worstPerformer: 'AAVE'
                }
            }
        ];
        setPortfolios(mockPortfolios);
    }, []);

    const currentPortfolio = portfolios[activePortfolio];

    const formatCurrency = (amount) => {
        return `${currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatPercentage = (percentage) => {
        return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
    };

    const getTotalPortfolioValue = () => {
        return portfolios.reduce((total, portfolio) => total + portfolio.totalValue, 0);
    };

    const getTotalDayChange = () => {
        const totalChange = portfolios.reduce((total, portfolio) => total + portfolio.dayChangeValue, 0);
        const totalValue = getTotalPortfolioValue();
        return (totalChange / (totalValue - totalChange)) * 100;
    };

    const AddHoldingModal = () => {
        const [selectedCoin, setSelectedCoin] = useState('');
        const [amount, setAmount] = useState('');
        const [buyPrice, setBuyPrice] = useState('');

        const handleAddHolding = () => {
            if (selectedCoin && amount && buyPrice) {
                const coin = allCoin.find(c => c.id === selectedCoin);
                if (coin) {
                    const newHolding = {
                        coinId: coin.id,
                        symbol: coin.symbol.toUpperCase(),
                        name: coin.name,
                        amount: parseFloat(amount),
                        avgBuyPrice: parseFloat(buyPrice),
                        currentPrice: coin.current_price,
                        value: parseFloat(amount) * coin.current_price,
                        change: ((coin.current_price - parseFloat(buyPrice)) / parseFloat(buyPrice)) * 100,
                        allocation: 0 // Will be recalculated
                    };

                    const updatedPortfolios = [...portfolios];
                    updatedPortfolios[activePortfolio].holdings.push(newHolding);
                    
                    // Recalculate allocations
                    const totalValue = updatedPortfolios[activePortfolio].holdings.reduce((sum, h) => sum + h.value, 0);
                    updatedPortfolios[activePortfolio].holdings.forEach(holding => {
                        holding.allocation = (holding.value / totalValue) * 100;
                    });
                    
                    updatedPortfolios[activePortfolio].totalValue = totalValue;
                    setPortfolios(updatedPortfolios);
                    setShowAddModal(false);
                    setSelectedCoin('');
                    setAmount('');
                    setBuyPrice('');
                }
            }
        };

        return (
            <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h3>Add New Holding</h3>
                    <div className="form-group">
                        <label>Select Cryptocurrency</label>
                        <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
                            <option value="">Choose a cryptocurrency</option>
                            {allCoin.slice(0, 100).map(coin => (
                                <option key={coin.id} value={coin.id}>
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>
                    <div className="form-group">
                        <label>Average Buy Price ({currency.symbol})</label>
                        <input
                            type="number"
                            step="any"
                            value={buyPrice}
                            onChange={(e) => setBuyPrice(e.target.value)}
                            placeholder="Enter buy price"
                        />
                    </div>
                    <div className="modal-buttons">
                        <button onClick={() => setShowAddModal(false)} className="cancel-btn">
                            Cancel
                        </button>
                        <button onClick={handleAddHolding} className="add-btn">
                            Add Holding
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (!currentPortfolio) {
        return (
            <div className='portfolio'>
                <div className="portfolio-hero">
                    <h1>Advanced Portfolio Tracking</h1>
                    <p>Monitor your cryptocurrency investments with comprehensive analytics and performance metrics</p>
                </div>
                <div className="empty-state">
                    <h3>No portfolios found</h3>
                    <p>Create your first portfolio to start tracking your investments</p>
                    <button className="primary-cta">Create Portfolio</button>
                </div>
            </div>
        );
    }

    return (
        <div className='portfolio'>
            <div className="portfolio-hero">
                <h1>Advanced Portfolio Tracking</h1>
                <p>Monitor your cryptocurrency investments with comprehensive analytics and performance metrics</p>
            </div>

            <div className="portfolio-header">
                <div className="portfolio-selector">
                    <select 
                        value={activePortfolio} 
                        onChange={(e) => setActivePortfolio(parseInt(e.target.value))}
                        className="portfolio-select"
                    >
                        {portfolios.map((portfolio, index) => (
                            <option key={portfolio.id} value={index}>
                                {portfolio.name}
                            </option>
                        ))}
                    </select>
                    <button className="add-portfolio-btn">+ New Portfolio</button>
                </div>

                <div className="portfolio-summary">
                    <div className="summary-card total-value">
                        <h3>Total Portfolio Value</h3>
                        <div className="value">{formatCurrency(currentPortfolio.totalValue)}</div>
                        <div className={`change ${currentPortfolio.dayChange > 0 ? 'positive' : 'negative'}`}>
                            {formatPercentage(currentPortfolio.dayChange)} ({formatCurrency(currentPortfolio.dayChangeValue)})
                        </div>
                    </div>
                    <div className="summary-card profit-loss">
                        <h3>Total P&L</h3>
                        <div className={`value ${currentPortfolio.performance.profitPercentage > 0 ? 'positive' : 'negative'}`}>
                            {formatCurrency(currentPortfolio.performance.totalProfit)}
                        </div>
                        <div className={`change ${currentPortfolio.performance.profitPercentage > 0 ? 'positive' : 'negative'}`}>
                            {formatPercentage(currentPortfolio.performance.profitPercentage)}
                        </div>
                    </div>
                    <div className="summary-card best-performer">
                        <h3>Best Performer</h3>
                        <div className="value">{currentPortfolio.performance.bestPerformer}</div>
                        <div className="change positive">24h</div>
                    </div>
                    <div className="summary-card worst-performer">
                        <h3>Worst Performer</h3>
                        <div className="value">{currentPortfolio.performance.worstPerformer}</div>
                        <div className="change negative">24h</div>
                    </div>
                </div>
            </div>

            <div className="portfolio-content">
                <div className="holdings-section">
                    <div className="section-header">
                        <h2>Holdings</h2>
                        <button 
                            className="add-holding-btn"
                            onClick={() => setShowAddModal(true)}
                        >
                            + Add Holding
                        </button>
                    </div>

                    <div className="holdings-table">
                        <div className="table-header">
                            <div className="header-cell">Asset</div>
                            <div className="header-cell">Amount</div>
                            <div className="header-cell">Avg. Buy Price</div>
                            <div className="header-cell">Current Price</div>
                            <div className="header-cell">Value</div>
                            <div className="header-cell">P&L</div>
                            <div className="header-cell">Allocation</div>
                            <div className="header-cell">Actions</div>
                        </div>

                        <div className="table-body">
                            {currentPortfolio.holdings.map((holding, index) => {
                                const coin = allCoin.find(c => c.id === holding.coinId);
                                return (
                                    <div key={index} className="table-row">
                                        <div className="cell asset">
                                            {coin && <img src={coin.image} alt={holding.name} />}
                                            <div className="asset-info">
                                                <span className="asset-name">{holding.name}</span>
                                                <span className="asset-symbol">{holding.symbol}</span>
                                            </div>
                                        </div>
                                        <div className="cell amount">
                                            {holding.amount.toLocaleString()} {holding.symbol}
                                        </div>
                                        <div className="cell avg-price">
                                            {formatCurrency(holding.avgBuyPrice)}
                                        </div>
                                        <div className="cell current-price">
                                            {formatCurrency(holding.currentPrice)}
                                        </div>
                                        <div className="cell value">
                                            {formatCurrency(holding.value)}
                                        </div>
                                        <div className={`cell pnl ${holding.change > 0 ? 'positive' : 'negative'}`}>
                                            {formatPercentage(holding.change)}
                                        </div>
                                        <div className="cell allocation">
                                            <div className="allocation-bar">
                                                <div 
                                                    className="allocation-fill" 
                                                    style={{ width: `${holding.allocation}%` }}
                                                ></div>
                                            </div>
                                            <span>{holding.allocation.toFixed(1)}%</span>
                                        </div>
                                        <div className="cell actions">
                                            <button className="action-btn edit">Edit</button>
                                            <button className="action-btn remove">Remove</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="analytics-section">
                    <h2>Portfolio Analytics</h2>
                    
                    <div className="analytics-grid">
                        <div className="analytics-card allocation-chart">
                            <h3>Asset Allocation</h3>
                            <div className="pie-chart">
                                <svg width="200" height="200" viewBox="0 0 200 200">
                                    {currentPortfolio.holdings.map((holding, index) => {
                                        const colors = ['#4500c6', '#00d4ff', '#ff4646', '#00d515', '#ff9500'];
                                        const angle = (holding.allocation / 100) * 360;
                                        const startAngle = currentPortfolio.holdings
                                            .slice(0, index)
                                            .reduce((sum, h) => sum + (h.allocation / 100) * 360, 0);
                                        
                                        const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                                        const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                                        const x2 = 100 + 80 * Math.cos((startAngle + angle - 90) * Math.PI / 180);
                                        const y2 = 100 + 80 * Math.sin((startAngle + angle - 90) * Math.PI / 180);
                                        
                                        const largeArcFlag = angle > 180 ? 1 : 0;
                                        
                                        return (
                                            <path
                                                key={index}
                                                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                                fill={colors[index % colors.length]}
                                                opacity="0.8"
                                            />
                                        );
                                    })}
                                </svg>
                            </div>
                            <div className="allocation-legend">
                                {currentPortfolio.holdings.map((holding, index) => {
                                    const colors = ['#4500c6', '#00d4ff', '#ff4646', '#00d515', '#ff9500'];
                                    return (
                                        <div key={index} className="legend-item">
                                            <div 
                                                className="legend-color" 
                                                style={{ backgroundColor: colors[index % colors.length] }}
                                            ></div>
                                            <span>{holding.symbol} ({holding.allocation.toFixed(1)}%)</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="analytics-card performance-metrics">
                            <h3>Performance Metrics</h3>
                            <div className="metrics-list">
                                <div className="metric-item">
                                    <span className="metric-label">Total Invested</span>
                                    <span className="metric-value">{formatCurrency(currentPortfolio.performance.totalInvested)}</span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-label">Current Value</span>
                                    <span className="metric-value">{formatCurrency(currentPortfolio.totalValue)}</span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-label">Total Return</span>
                                    <span className={`metric-value ${currentPortfolio.performance.profitPercentage > 0 ? 'positive' : 'negative'}`}>
                                        {formatCurrency(currentPortfolio.performance.totalProfit)}
                                    </span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-label">Return %</span>
                                    <span className={`metric-value ${currentPortfolio.performance.profitPercentage > 0 ? 'positive' : 'negative'}`}>
                                        {formatPercentage(currentPortfolio.performance.profitPercentage)}
                                    </span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-label">24h Change</span>
                                    <span className={`metric-value ${currentPortfolio.dayChange > 0 ? 'positive' : 'negative'}`}>
                                        {formatPercentage(currentPortfolio.dayChange)}
                                    </span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-label">Holdings Count</span>
                                    <span className="metric-value">{currentPortfolio.holdings.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-showcase">
                <h2>Portfolio Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Real-time Tracking</h3>
                        <p>Monitor your portfolio value and performance with live price updates and instant calculations.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3>Performance Analytics</h3>
                        <p>Detailed profit/loss analysis, return calculations, and performance benchmarking against market indices.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Asset Allocation</h3>
                        <p>Visual representation of your portfolio distribution with rebalancing recommendations.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Multi-Portfolio</h3>
                        <p>Create and manage multiple portfolios for different strategies, risk levels, or investment goals.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔔</div>
                        <h3>Smart Alerts</h3>
                        <p>Get notified about significant portfolio changes, profit targets, and rebalancing opportunities.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3>Tax Reporting</h3>
                        <p>Automated tax calculations and reporting tools to simplify your cryptocurrency tax obligations.</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Ready to Track Your Crypto Portfolio?</h2>
                <p>Start monitoring your investments with professional-grade portfolio analytics</p>
                <div className="cta-buttons">
                    <Link to="/signup" className="primary-cta">Start Free Trial</Link>
                    <Link to="/pricing" className="secondary-cta">View Pricing</Link>
                </div>
            </div>

            {showAddModal && <AddHoldingModal />}
        </div>
    );
};

export default Portfolio;