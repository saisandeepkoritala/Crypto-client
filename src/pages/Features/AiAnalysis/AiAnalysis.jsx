import React, { useState, useContext, useEffect } from 'react'
import '../AiAnalysis/AiAnalysis.css'
import { CoinContext } from '../../../context/CoinContext'
import { Link } from 'react-router-dom'

const AIAnalysis = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [selectedCoin, setSelectedCoin] = useState('bitcoin');
    const [analysisType, setAnalysisType] = useState('technical');
    const [timeframe, setTimeframe] = useState('24h');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Mock AI analysis data
    const [aiData, setAiData] = useState({
        sentiment: {
            score: 78,
            label: 'Bullish',
            sources: 1247,
            trending: '+12%'
        },
        technicalAnalysis: {
            signal: 'BUY',
            confidence: 85,
            indicators: [
                { name: 'RSI', value: 65, signal: 'Neutral', description: 'Not overbought or oversold' },
                { name: 'MACD', value: 'Bullish', signal: 'Buy', description: 'Positive momentum crossover' },
                { name: 'Moving Average', value: 'Above', signal: 'Buy', description: 'Price above 50-day MA' },
                { name: 'Volume', value: 'High', signal: 'Buy', description: 'Above average volume' }
            ],
            priceTargets: {
                support: 42000,
                resistance: 48000,
                target: 52000
            }
        },
        predictions: [
            { timeframe: '1 Hour', prediction: 43250, confidence: 72, change: 1.2 },
            { timeframe: '24 Hours', prediction: 44800, confidence: 68, change: 4.8 },
            { timeframe: '7 Days', prediction: 47200, confidence: 61, change: 10.3 },
            { timeframe: '30 Days', prediction: 52000, confidence: 54, change: 21.6 }
        ],
        signals: [
            { type: 'buy', coin: 'BTC', confidence: 85, reason: 'Strong technical breakout', timestamp: '2 min ago' },
            { type: 'hold', coin: 'ETH', confidence: 72, reason: 'Consolidation phase', timestamp: '5 min ago' },
            { type: 'sell', coin: 'DOGE', confidence: 68, reason: 'Overbought conditions', timestamp: '8 min ago' },
            { type: 'buy', coin: 'SOL', confidence: 79, reason: 'Positive momentum', timestamp: '12 min ago' }
        ],
        riskAssessment: {
            level: 'Medium',
            score: 6.5,
            factors: [
                { factor: 'Volatility', impact: 'High', description: 'Recent price swings above average' },
                { factor: 'Market Cap', impact: 'Low', description: 'Large cap provides stability' },
                { factor: 'Liquidity', impact: 'Low', description: 'High trading volume' },
                { factor: 'Correlation', impact: 'Medium', description: 'Moderate correlation with market' }
            ]
        }
    });

    const runAIAnalysis = async () => {
        setIsAnalyzing(true);
        
        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Update with new mock data
        setAiData(prev => ({
            ...prev,
            sentiment: {
                ...prev.sentiment,
                score: Math.floor(Math.random() * 40) + 60,
                trending: Math.random() > 0.5 ? '+' : '-' + Math.floor(Math.random() * 20) + '%'
            },
            technicalAnalysis: {
                ...prev.technicalAnalysis,
                confidence: Math.floor(Math.random() * 30) + 70
            }
        }));
        
        setIsAnalyzing(false);
    };

    const SentimentMeter = ({ score }) => {
        const getColor = (score) => {
            if (score >= 70) return '#00d515';
            if (score >= 40) return '#ff9500';
            return '#ff4646';
        };

        const getLabel = (score) => {
            if (score >= 70) return 'Bullish';
            if (score >= 40) return 'Neutral';
            return 'Bearish';
        };

        return (
            <div className="sentiment-meter">
                <div className="meter-container">
                    <div className="meter-track">
                        <div 
                            className="meter-fill" 
                            style={{ 
                                width: `${score}%`,
                                backgroundColor: getColor(score)
                            }}
                        ></div>
                    </div>
                    <div className="meter-labels">
                        <span>Bearish</span>
                        <span>Neutral</span>
                        <span>Bullish</span>
                    </div>
                </div>
                <div className="sentiment-score">
                    <span className="score" style={{ color: getColor(score) }}>
                        {score}/100
                    </span>
                    <span className="label">{getLabel(score)}</span>
                </div>
            </div>
        );
    };

    const TechnicalIndicator = ({ indicator }) => {
        const getSignalColor = (signal) => {
            switch (signal.toLowerCase()) {
                case 'buy': return '#00d515';
                case 'sell': return '#ff4646';
                default: return '#ff9500';
            }
        };

        return (
            <div className="technical-indicator">
                <div className="indicator-header">
                    <span className="indicator-name">{indicator.name}</span>
                    <span 
                        className="indicator-signal"
                        style={{ color: getSignalColor(indicator.signal) }}
                    >
                        {indicator.signal}
                    </span>
                </div>
                <div className="indicator-value">{indicator.value}</div>
                <div className="indicator-description">{indicator.description}</div>
            </div>
        );
    };

    const PredictionCard = ({ prediction }) => {
        const isPositive = prediction.change > 0;
        
        return (
            <div className="prediction-card">
                <div className="prediction-timeframe">{prediction.timeframe}</div>
                <div className="prediction-price">
                    {currency.symbol}{prediction.prediction.toLocaleString()}
                </div>
                <div className={`prediction-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '+' : ''}{prediction.change.toFixed(1)}%
                </div>
                <div className="prediction-confidence">
                    <div className="confidence-bar">
                        <div 
                            className="confidence-fill" 
                            style={{ width: `${prediction.confidence}%` }}
                        ></div>
                    </div>
                    <span>{prediction.confidence}% confidence</span>
                </div>
            </div>
        );
    };

    const SignalItem = ({ signal }) => {
        const getSignalIcon = (type) => {
            switch (type) {
                case 'buy': return '🟢';
                case 'sell': return '🔴';
                default: return '🟡';
            }
        };

        const getSignalColor = (type) => {
            switch (type) {
                case 'buy': return '#00d515';
                case 'sell': return '#ff4646';
                default: return '#ff9500';
            }
        };

        return (
            <div className="signal-item">
                <div className="signal-header">
                    <div className="signal-type">
                        <span className="signal-icon">{getSignalIcon(signal.type)}</span>
                        <span 
                            className="signal-label"
                            style={{ color: getSignalColor(signal.type) }}
                        >
                            {signal.type.toUpperCase()}
                        </span>
                        <span className="signal-coin">{signal.coin}</span>
                    </div>
                    <div className="signal-confidence">{signal.confidence}%</div>
                </div>
                <div className="signal-reason">{signal.reason}</div>
                <div className="signal-timestamp">{signal.timestamp}</div>
            </div>
        );
    };

    return (
        <div className='ai-analysis'>
            <div className="ai-hero">
                <h1>AI-Powered Market Analysis</h1>
                <p>Leverage artificial intelligence to get market insights, trend predictions, and trading recommendations</p>
                
                <div className="ai-stats">
                    <div className="stat-item">
                        <span className="stat-value">1M+</span>
                        <span className="stat-label">Data Points Analyzed</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">85%</span>
                        <span className="stat-label">Prediction Accuracy</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">24/7</span>
                        <span className="stat-label">Market Monitoring</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value live">🤖 AI</span>
                        <span className="stat-label">Always Learning</span>
                    </div>
                </div>
            </div>

            <div className="analysis-controls">
                <div className="control-group">
                    <label>Select Cryptocurrency</label>
                    <select 
                        value={selectedCoin} 
                        onChange={(e) => setSelectedCoin(e.target.value)}
                        className="control-select"
                    >
                        {allCoin.slice(0, 20).map(coin => (
                            <option key={coin.id} value={coin.id}>
                                {coin.name} ({coin.symbol.toUpperCase()})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label>Analysis Type</label>
                    <select 
                        value={analysisType} 
                        onChange={(e) => setAnalysisType(e.target.value)}
                        className="control-select"
                    >
                        <option value="technical">Technical Analysis</option>
                        <option value="sentiment">Sentiment Analysis</option>
                        <option value="fundamental">Fundamental Analysis</option>
                        <option value="comprehensive">Comprehensive</option>
                    </select>
                </div>

                <div className="control-group">
                    <label>Timeframe</label>
                    <select 
                        value={timeframe} 
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="control-select"
                    >
                        <option value="1h">1 Hour</option>
                        <option value="24h">24 Hours</option>
                        <option value="7d">7 Days</option>
                        <option value="30d">30 Days</option>
                    </select>
                </div>

                <button 
                    className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
                    onClick={runAIAnalysis}
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? (
                        <>
                            <div className="spinner-small"></div>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            🤖 Run AI Analysis
                        </>
                    )}
                </button>
            </div>

            <div className="analysis-dashboard">
                <div className="dashboard-section sentiment-section">
                    <h2>Market Sentiment</h2>
                    <div className="sentiment-overview">
                        <SentimentMeter score={aiData.sentiment.score} />
                        <div className="sentiment-details">
                            <div className="sentiment-stat">
                                <span className="stat-label">Sources Analyzed</span>
                                <span className="stat-value">{aiData.sentiment.sources.toLocaleString()}</span>
                            </div>
                            <div className="sentiment-stat">
                                <span className="stat-label">Trending</span>
                                <span className={`stat-value ${aiData.sentiment.trending.startsWith('+') ? 'positive' : 'negative'}`}>
                                    {aiData.sentiment.trending}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-section technical-section">
                    <h2>Technical Analysis</h2>
                    <div className="technical-overview">
                        <div className="overall-signal">
                            <div className="signal-badge">
                                <span className={`signal-text ${aiData.technicalAnalysis.signal.toLowerCase()}`}>
                                    {aiData.technicalAnalysis.signal}
                                </span>
                                <span className="confidence-text">
                                    {aiData.technicalAnalysis.confidence}% Confidence
                                </span>
                            </div>
                        </div>
                        
                        <div className="price-targets">
                            <div className="target-item">
                                <span className="target-label">Support</span>
                                <span className="target-value">
                                    {currency.symbol}{aiData.technicalAnalysis.priceTargets.support.toLocaleString()}
                                </span>
                            </div>
                            <div className="target-item">
                                <span className="target-label">Resistance</span>
                                <span className="target-value">
                                    {currency.symbol}{aiData.technicalAnalysis.priceTargets.resistance.toLocaleString()}
                                </span>
                            </div>
                            <div className="target-item">
                                <span className="target-label">Target</span>
                                <span className="target-value">
                                    {currency.symbol}{aiData.technicalAnalysis.priceTargets.target.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="technical-indicators">
                        {aiData.technicalAnalysis.indicators.map((indicator, index) => (
                            <TechnicalIndicator key={index} indicator={indicator} />
                        ))}
                    </div>
                </div>

                <div className="dashboard-section predictions-section">
                    <h2>AI Price Predictions</h2>
                    <div className="predictions-grid">
                        {aiData.predictions.map((prediction, index) => (
                            <PredictionCard key={index} prediction={prediction} />
                        ))}
                    </div>
                </div>

                <div className="dashboard-section signals-section">
                    <h2>Live Trading Signals</h2>
                    <div className="signals-list">
                        {aiData.signals.map((signal, index) => (
                            <SignalItem key={index} signal={signal} />
                        ))}
                    </div>
                </div>

                <div className="dashboard-section risk-section">
                    <h2>Risk Assessment</h2>
                    <div className="risk-overview">
                        <div className="risk-score">
                            <div className="score-circle">
                                <span className="score-value">{aiData.riskAssessment.score}</span>
                                <span className="score-max">/10</span>
                            </div>
                            <div className="risk-level">{aiData.riskAssessment.level} Risk</div>
                        </div>
                        
                        <div className="risk-factors">
                            {aiData.riskAssessment.factors.map((factor, index) => (
                                <div key={index} className="risk-factor">
                                    <div className="factor-header">
                                        <span className="factor-name">{factor.factor}</span>
                                        <span className={`factor-impact ${factor.impact.toLowerCase()}`}>
                                            {factor.impact}
                                        </span>
                                    </div>
                                    <div className="factor-description">{factor.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="features-showcase">
                <h2>AI Analysis Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🧠</div>
                        <h3>Machine Learning</h3>
                        <p>Advanced algorithms that learn from market patterns and continuously improve prediction accuracy.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Sentiment Analysis</h3>
                        <p>Real-time analysis of social media, news, and market sentiment from thousands of sources.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Price Predictions</h3>
                        <p>AI-powered price forecasts with confidence intervals for multiple timeframes.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Real-time Signals</h3>
                        <p>Instant trading signals based on technical indicators and market conditions.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Risk Assessment</h3>
                        <p>Comprehensive risk analysis to help you make informed investment decisions.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📈</div>
                        <h3>Technical Analysis</h3>
                        <p>Automated technical indicator analysis with clear buy/sell/hold recommendations.</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Ready to Harness AI for Trading?</h2>
                <p>Join thousands of traders using AI-powered insights to make better investment decisions</p>
                <div className="cta-buttons">
                    <Link to="/signup" className="primary-cta">Start Free Trial</Link>
                    <Link to="/pricing" className="secondary-cta">View Pricing</Link>
                </div>
            </div>
        </div>
    );
};

export default AIAnalysis;