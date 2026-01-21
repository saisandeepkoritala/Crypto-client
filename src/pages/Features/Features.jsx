import React, { useState, useContext } from 'react'
import './Features.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [demoMode, setDemoMode] = useState(false);
    const { allCoin, currency } = useContext(CoinContext);

    // Mock portfolio data
    const portfolioData = {
        totalValue: 45230,
        dayChange: 12.5,
        holdings: [
            { symbol: 'BTC', amount: 0.5, value: 21500, change: 8.2 },
            { symbol: 'ETH', amount: 8.2, value: 15600, change: 15.7 },
            { symbol: 'ADA', amount: 2500, value: 8130, change: -2.1 }
        ]
    };

    // Mock AI signals
    const aiSignals = [
        { type: 'buy', coin: 'BTC', confidence: 85, reason: 'Strong technical breakout' },
        { type: 'hold', coin: 'ETH', confidence: 72, reason: 'Consolidation phase' },
        { type: 'sell', coin: 'DOGE', confidence: 68, reason: 'Overbought conditions' }
    ];

    // Mock DeFi opportunities
    const defiOpportunities = [
        { protocol: 'Ethereum 2.0', asset: 'ETH', apy: 4.2, risk: 'Low' },
        { protocol: 'Uniswap V3', asset: 'USDC-ETH', apy: 8.7, risk: 'Medium' },
        { protocol: 'Compound', asset: 'USDC', apy: 3.1, risk: 'Low' },
        { protocol: 'Yearn Finance', asset: 'BTC', apy: 6.1, risk: 'Medium' }
    ];

    const features = [
        {
            id: 1,
            title: "Real-Time Market Data",
            description: "Get instant access to live cryptocurrency prices, market caps, and trading volumes from over 10,000+ digital assets.",
            icon: "📊",
            details: [
                "Live price updates every second",
                "Historical data up to 10 years",
                "Advanced charting tools",
                "Market depth analysis",
                "Price alerts and notifications"
            ],
            image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
            link: "/features/market-data",
            demo: () => (
                <div className="feature-demo">
                    <div className="demo-header">
                        <h4>Live Market Data</h4>
                        <span className="live-indicator">🔴 LIVE</span>
                    </div>
                    <div className="market-data-grid">
                        {allCoin.slice(0, 5).map((coin, index) => (
                            <div key={index} className="market-item">
                                <div className="coin-info">
                                    <img src={coin.image} alt={coin.name} />
                                    <div>
                                        <div className="coin-name">{coin.symbol.toUpperCase()}</div>
                                        <div className="coin-full-name">{coin.name}</div>
                                    </div>
                                </div>
                                <div className="price-info">
                                    <div className="current-price">
                                        {currency.symbol}{coin.current_price.toLocaleString()}
                                    </div>
                                    <div className={`price-change ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
                                        {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="demo-stats">
                        <div className="stat">
                            <span className="stat-value">{allCoin.length}</span>
                            <span className="stat-label">Coins Tracked</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">500+</span>
                            <span className="stat-label">Exchanges</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: "Advanced Portfolio Tracking",
            description: "Monitor your cryptocurrency investments with comprehensive portfolio analytics and performance metrics.",
            icon: "💼",
            details: [
                "Multi-exchange portfolio sync",
                "Profit/Loss calculations",
                "Asset allocation insights",
                "Performance benchmarking",
                "Tax reporting tools"
            ],
            image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
            link: "/features/portfolio",
            demo: () => (
                <div className="feature-demo">
                    <div className="demo-header">
                        <h4>Portfolio Overview</h4>
                        <span className="portfolio-value">{currency.symbol}{portfolioData.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="portfolio-summary">
                        <div className="summary-item">
                            <span className="summary-label">24h Change</span>
                            <span className={`summary-value ${portfolioData.dayChange > 0 ? 'positive' : 'negative'}`}>
                                {portfolioData.dayChange > 0 ? '+' : ''}{portfolioData.dayChange}%
                            </span>
                        </div>
                        <div className="summary-item">
                            <span className="summary-label">Total Profit</span>
                            <span className="summary-value positive">+{currency.symbol}8,450</span>
                        </div>
                    </div>
                    <div className="holdings-list">
                        {portfolioData.holdings.map((holding, index) => (
                            <div key={index} className="holding-item">
                                <div className="holding-info">
                                    <span className="holding-symbol">{holding.symbol}</span>
                                    <span className="holding-amount">{holding.amount} {holding.symbol}</span>
                                </div>
                                <div className="holding-value">
                                    <span className="value">{currency.symbol}{holding.value.toLocaleString()}</span>
                                    <span className={`change ${holding.change > 0 ? 'positive' : 'negative'}`}>
                                        {holding.change > 0 ? '+' : ''}{holding.change}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: "AI-Powered Market Analysis",
            description: "Leverage artificial intelligence to get market insights, trend predictions, and trading recommendations.",
            icon: "🤖",
            details: [
                "Machine learning price predictions",
                "Sentiment analysis from social media",
                "Technical indicator automation",
                "Risk assessment algorithms",
                "Personalized trading signals"
            ],
            image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800",
            link: "/features/ai-analysis",
            demo: () => (
                <div className="feature-demo">
                    <div className="demo-header">
                        <h4>AI Market Insights</h4>
                        <span className="ai-status">🤖 AI Active</span>
                    </div>
                    <div className="sentiment-meter">
                        <div className="sentiment-label">Market Sentiment</div>
                        <div className="sentiment-bar">
                            <div className="sentiment-fill" style={{ width: '78%' }}></div>
                        </div>
                        <div className="sentiment-value">Bullish 78%</div>
                    </div>
                    <div className="ai-signals">
                        <h5>Trading Signals</h5>
                        {aiSignals.map((signal, index) => (
                            <div key={index} className="signal-item">
                                <div className="signal-info">
                                    <span className={`signal-type ${signal.type}`}>
                                        {signal.type === 'buy' ? '🟢' : signal.type === 'sell' ? '🔴' : '🟡'} 
                                        {signal.type.toUpperCase()}
                                    </span>
                                    <span className="signal-coin">{signal.coin}</span>
                                </div>
                                <div className="signal-details">
                                    <span className="confidence">{signal.confidence}% confidence</span>
                                    <span className="reason">{signal.reason}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 4,
            title: "Secure Wallet Integration",
            description: "Connect and manage multiple cryptocurrency wallets with bank-level security and encryption.",
            icon: "🔐",
            details: [
                "Multi-signature wallet support",
                "Hardware wallet integration",
                "Cold storage solutions",
                "Two-factor authentication",
                "Insurance coverage up to $1M"
            ],
            image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
            link: "/features/secure-wallet",
            demo: () => (
                <div className="feature-demo">
                    <div className="demo-header">
                        <h4>Wallet Security Dashboard</h4>
                        <span className="security-score">🛡️ 98/100</span>
                    </div>
                    <div className="security-features">
                        <div className="security-item active">
                            <span className="security-icon">🔐</span>
                            <div className="security-info">
                                <span className="security-name">Hardware Wallet</span>
                                <span className="security-status">Connected - Ledger Nano X</span>
                            </div>
                        </div>
                        <div className="security-item active">
                            <span className="security-icon">🔑</span>
                            <div className="security-info">
                                <span className="security-name">Multi-Signature</span>
                                <span className="security-status">3/5 signatures required</span>
                            </div>
                        </div>
                        <div className="security-item active">
                            <span className="security-icon">📱</span>
                            <div className="security-info">
                                <span className="security-name">2FA Authentication</span>
                                <span className="security-status">Google Authenticator</span>
                            </div>
                        </div>
                        <div className="security-item active">
                            <span className="security-icon">🛡️</span>
                            <div className="security-info">
                                <span className="security-name">Insurance Coverage</span>
                                <span className="security-status">Up to $1,000,000</span>
                            </div>
                        </div>
                    </div>
                    <div className="wallet-stats">
                        <div className="wallet-stat">
                            <span className="stat-value">5</span>
                            <span className="stat-label">Connected Wallets</span>
                        </div>
                        <div className="wallet-stat">
                            <span className="stat-value">0</span>
                            <span className="stat-label">Security Incidents</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 5,
            title: "DeFi Protocol Access",
            description: "Access decentralized finance protocols directly from our platform with simplified interfaces.",
            icon: "🌐",
            details: [
                "Yield farming opportunities",
                "Liquidity pool management",
                "Staking rewards optimization",
                "Cross-chain bridge access",
                "Gas fee optimization"
            ],
            image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
            demo: () => (
                <div className="feature-demo">
                    <div className="demo-header">
                        <h4>DeFi Opportunities</h4>
                        <span className="defi-tvl">TVL: $2.4B</span>
                    </div>
                    <div className="defi-opportunities">
                        {defiOpportunities.map((opportunity, index) => (
                            <div key={index} className="defi-item">
                                <div className="defi-info">
                                    <span className="protocol-name">{opportunity.protocol}</span>
                                    <span className="asset-name">{opportunity.asset}</span>
                                </div>
                                <div className="defi-metrics">
                                    <span className="apy">{opportunity.apy}% APY</span>
                                    <span className={`risk ${opportunity.risk.toLowerCase()}`}>
                                        {opportunity.risk} Risk
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="defi-summary">
                        <div className="summary-stat">
                            <span className="stat-value">$12,450</span>
                            <span className="stat-label">Your DeFi Holdings</span>
                        </div>
                        <div className="summary-stat">
                            <span className="stat-value">5.8%</span>
                            <span className="stat-label">Avg. APY</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 6,
            title: "Professional Trading Tools",
            description: "Execute trades like a pro with advanced order types, algorithmic trading, and market analysis tools.",
            icon: "⚡",
            details: [
                "Advanced order types (Stop-loss, Take-profit)",
                "Algorithmic trading bots",
                "Technical analysis indicators",
                "Market scanner and screener",
                "Copy trading from experts"
            ],
            image: "https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=800",
            demo: () => (
                <div className="feature-demo">
                    <div className="demo-header">
                        <h4>Trading Dashboard</h4>
                        <span className="trading-status">⚡ Active</span>
                    </div>
                    <div className="trading-summary">
                        <div className="trading-stat">
                            <span className="stat-value">3</span>
                            <span className="stat-label">Active Orders</span>
                        </div>
                        <div className="trading-stat">
                            <span className="stat-value positive">+{currency.symbol}1,247</span>
                            <span className="stat-label">P&L Today</span>
                        </div>
                        <div className="trading-stat">
                            <span className="stat-value">87%</span>
                            <span className="stat-label">Win Rate</span>
                        </div>
                    </div>
                    <div className="active-orders">
                        <h5>Active Orders</h5>
                        <div className="order-item">
                            <span className="order-type stop-loss">Stop-Loss</span>
                            <span className="order-pair">BTC/USD</span>
                            <span className="order-price">@{currency.symbol}42,000</span>
                        </div>
                        <div className="order-item">
                            <span className="order-type take-profit">Take-Profit</span>
                            <span className="order-pair">ETH/USD</span>
                            <span className="order-price">@{currency.symbol}2,800</span>
                        </div>
                        <div className="order-item">
                            <span className="order-type limit">Limit Buy</span>
                            <span className="order-pair">ADA/USD</span>
                            <span className="order-price">@{currency.symbol}0.45</span>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const stats = [
        { number: "10,000+", label: "Cryptocurrencies Tracked" },
        { number: "500+", label: "Exchanges Supported" },
        { number: "1M+", label: "Active Users" },
        { number: "99.9%", label: "Uptime Guarantee" }
    ];

    const handleTryFeature = () => {
        setDemoMode(true);
        // Simulate feature activation
        setTimeout(() => {
            // Navigate to the specific feature page
            window.location.href = features[activeFeature].link;
        }, 1000);
    };

    return (
        <div className='features'>
            <div className="features-hero">
                <h1>Powerful Features for Crypto Enthusiasts</h1>
                <p>Everything you need to navigate the cryptocurrency market with confidence and precision</p>
            </div>

            <div className="features-stats">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <h3>{stat.number}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="features-showcase">
                <div className="features-nav">
                    {features.map((feature, index) => (
                        <button
                            key={feature.id}
                            className={`feature-nav-item ${activeFeature === index ? 'active' : ''}`}
                            onClick={() => setActiveFeature(index)}
                        >
                            <span className="feature-icon">{feature.icon}</span>
                            <div className="feature-nav-content">
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="features-display">
                    <div className="feature-image">
                        <img src={features[activeFeature].image} alt={features[activeFeature].title} />
                        <div className="feature-overlay">
                            <span className="feature-icon-large">{features[activeFeature].icon}</span>
                        </div>
                    </div>
                    <div className="feature-details">
                        <h3>{features[activeFeature].title}</h3>
                        <p>{features[activeFeature].description}</p>
                        <ul>
                            {features[activeFeature].details.map((detail, index) => (
                                <li key={index}>
                                    <span className="check-icon">✓</span>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                        
                        {/* Live Demo Section */}
                        <div className="live-demo-section">
                            <h4>Live Demo:</h4>
                            {features[activeFeature].demo()}
                        </div>
                        
                        <button 
                            className={`cta-button ${demoMode ? 'loading' : ''}`}
                            onClick={handleTryFeature}
                            disabled={demoMode}
                        >
                            {demoMode ? (
                                <>
                                    <div className="spinner-small"></div>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    Explore This Feature
                                    <span className="arrow">→</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="features-grid">
                <h2>Why Choose Cryptoplace?</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon">🚀</div>
                        <h4>Lightning Fast</h4>
                        <p>Sub-second data updates and instant trade execution across all supported exchanges</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🛡️</div>
                        <h4>Bank-Level Security</h4>
                        <p>Military-grade encryption, cold storage, and comprehensive insurance protection</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">📱</div>
                        <h4>Mobile First</h4>
                        <p>Fully responsive design with native mobile apps for iOS and Android</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🎯</div>
                        <h4>Precision Analytics</h4>
                        <p>Advanced algorithms and AI-powered insights for better trading decisions</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🌍</div>
                        <h4>Global Coverage</h4>
                        <p>Support for 50+ fiat currencies and 500+ cryptocurrency exchanges worldwide</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">💬</div>
                        <h4>24/7 Support</h4>
                        <p>Round-the-clock customer support with average response time under 2 minutes</p>
                    </div>
                </div>
            </div>

            <div className="features-cta">
                <div className="cta-content">
                    <h2>Ready to Experience the Future of Crypto Trading?</h2>
                    <p>Join over 1 million users who trust Cryptoplace for their cryptocurrency needs</p>
                    <div className="cta-buttons">
                        <Link to="/signup" className="primary-cta">
                            Start Free Trial
                        </Link>
                        <Link to="/pricing" className="secondary-cta">
                            View Pricing Plans
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;