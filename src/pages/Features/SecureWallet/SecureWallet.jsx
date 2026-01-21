import React, { useState } from 'react'
import './SecureWallet.css'
import { Link } from 'react-router-dom'

const SecureWallet = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [securityLevel, setSecurityLevel] = useState(98);
    const [connectedWallets, setConnectedWallets] = useState([
        {
            id: 1,
            name: 'Ledger Nano X',
            type: 'Hardware',
            status: 'Connected',
            balance: 45230.50,
            lastUsed: '2 hours ago',
            security: 'High'
        },
        {
            id: 2,
            name: 'MetaMask',
            type: 'Browser',
            status: 'Connected',
            balance: 12450.30,
            lastUsed: '1 day ago',
            security: 'Medium'
        },
        {
            id: 3,
            name: 'Trust Wallet',
            type: 'Mobile',
            status: 'Disconnected',
            balance: 0,
            lastUsed: '1 week ago',
            security: 'Medium'
        }
    ]);

    const securityFeatures = [
        {
            name: 'Multi-Signature',
            status: 'Active',
            description: '3 of 5 signatures required for transactions',
            icon: '🔐',
            level: 'High'
        },
        {
            name: 'Hardware Wallet',
            status: 'Connected',
            description: 'Ledger Nano X connected and verified',
            icon: '🔑',
            level: 'High'
        },
        {
            name: '2FA Authentication',
            status: 'Enabled',
            description: 'Google Authenticator active',
            icon: '📱',
            level: 'High'
        },
        {
            name: 'Biometric Lock',
            status: 'Enabled',
            description: 'Fingerprint and Face ID enabled',
            icon: '👆',
            level: 'High'
        },
        {
            name: 'Cold Storage',
            status: 'Active',
            description: '95% of funds in cold storage',
            icon: '❄️',
            level: 'High'
        },
        {
            name: 'Insurance Coverage',
            status: 'Active',
            description: 'Up to $1,000,000 coverage',
            icon: '🛡️',
            level: 'High'
        }
    ];

    const transactionHistory = [
        {
            id: 1,
            type: 'Received',
            amount: 0.5,
            currency: 'BTC',
            from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            timestamp: '2024-01-15 14:30:22',
            status: 'Confirmed',
            confirmations: 6
        },
        {
            id: 2,
            type: 'Sent',
            amount: 2.5,
            currency: 'ETH',
            to: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2F6',
            timestamp: '2024-01-15 12:15:10',
            status: 'Confirmed',
            confirmations: 12
        },
        {
            id: 3,
            type: 'Received',
            amount: 1000,
            currency: 'USDC',
            from: '0x8ba1f109551bD432803012645Hac136c',
            timestamp: '2024-01-14 18:45:33',
            status: 'Confirmed',
            confirmations: 24
        }
    ];

    const SecurityScore = ({ score }) => {
        const getColor = (score) => {
            if (score >= 90) return '#00d515';
            if (score >= 70) return '#ff9500';
            return '#ff4646';
        };

        const getLabel = (score) => {
            if (score >= 90) return 'Excellent';
            if (score >= 70) return 'Good';
            return 'Needs Improvement';
        };

        return (
            <div className="security-score">
                <div className="score-circle">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke={getColor(score)}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(score / 100) * 314} 314`}
                            transform="rotate(-90 60 60)"
                        />
                    </svg>
                    <div className="score-content">
                        <span className="score-value">{score}</span>
                        <span className="score-max">/100</span>
                    </div>
                </div>
                <div className="score-label">{getLabel(score)}</div>
            </div>
        );
    };

    const WalletCard = ({ wallet }) => {
        const getStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case 'connected': return '#00d515';
                case 'disconnected': return '#ff4646';
                default: return '#ff9500';
            }
        };

        const getSecurityColor =  (level) => {
            switch (level.toLowerCase()) {
                case 'high': return '#00d515';
                case 'medium': return '#ff9500';
                case 'low': return '#ff4646';
                default: return '#888';
            }
        };

        return (
            <div className="wallet-card">
                <div className="wallet-header">
                    <div className="wallet-info">
                        <h4>{wallet.name}</h4>
                        <span className="wallet-type">{wallet.type} Wallet</span>
                    </div>
                    <div 
                        className="wallet-status"
                        style={{ color: getStatusColor(wallet.status) }}
                    >
                        {wallet.status}
                    </div>
                </div>
                
                <div className="wallet-balance">
                    <span className="balance-label">Balance</span>
                    <span className="balance-value">${wallet.balance.toLocaleString()}</span>
                </div>
                
                <div className="wallet-details">
                    <div className="detail-item">
                        <span className="detail-label">Last Used</span>
                        <span className="detail-value">{wallet.lastUsed}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Security</span>
                        <span 
                            className="detail-value"
                            style={{ color: getSecurityColor(wallet.security) }}
                        >
                            {wallet.security}
                        </span>
                    </div>
                </div>
                
                <div className="wallet-actions">
                    <button className="action-btn primary">Manage</button>
                    <button className="action-btn secondary">Settings</button>
                </div>
            </div>
        );
    };

    const SecurityFeature = ({ feature }) => {
        const getStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case 'active':
                case 'enabled':
                case 'connected': return '#00d515';
                case 'disabled':
                case 'disconnected': return '#ff4646';
                default: return '#ff9500';
            }
        };

        return (
            <div className="security-feature">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                    <div className="feature-header">
                        <h4>{feature.name}</h4>
                        <span 
                            className="feature-status"
                            style={{ color: getStatusColor(feature.status) }}
                        >
                            {feature.status}
                        </span>
                    </div>
                    <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-level">
                    <span className={`level-badge ${feature.level.toLowerCase()}`}>
                        {feature.level}
                    </span>
                </div>
            </div>
        );
    };

    const TransactionItem = ({ transaction }) => {
        const getTypeColor = (type) => {
            return type === 'Received' ? '#00d515' : '#ff4646';
        };

        const getStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case 'confirmed': return '#00d515';
                case 'pending': return '#ff9500';
                case 'failed': return '#ff4646';
                default: return '#888';
            }
        };

        return (
            <div className="transaction-item">
                <div className="transaction-type">
                    <span 
                        className="type-indicator"
                        style={{ color: getTypeColor(transaction.type) }}
                    >
                        {transaction.type === 'Received' ? '↓' : '↑'}
                    </span>
                    <div className="type-info">
                        <span className="type-label">{transaction.type}</span>
                        <span className="type-address">
                            {transaction.from || transaction.to}
                        </span>
                    </div>
                </div>
                
                <div className="transaction-amount">
                    <span className="amount-value">
                        {transaction.amount} {transaction.currency}
                    </span>
                    <span className="amount-timestamp">{transaction.timestamp}</span>
                </div>
                
                <div className="transaction-status">
                    <span 
                        className="status-badge"
                        style={{ color: getStatusColor(transaction.status) }}
                    >
                        {transaction.status}
                    </span>
                    <span className="confirmations">
                        {transaction.confirmations} confirmations
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className='secure-wallet'>
            <div className="wallet-hero">
                <h1>Secure Wallet Integration</h1>
                <p>Connect and manage multiple cryptocurrency wallets with bank-level security and encryption</p>
                
                <div className="security-overview">
                    <SecurityScore score={securityLevel} />
                    <div className="security-stats">
                        <div className="stat-item">
                            <span className="stat-value">{connectedWallets.filter(w => w.status === 'Connected').length}</span>
                            <span className="stat-label">Connected Wallets</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">$1M</span>
                            <span className="stat-label">Insurance Coverage</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">0</span>
                            <span className="stat-label">Security Incidents</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">256-bit</span>
                            <span className="stat-label">Encryption</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wallet-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'wallets' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wallets')}
                >
                    My Wallets
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    Security
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('transactions')}
                >
                    Transactions
                </button>
            </div>

            <div className="wallet-content">
                {activeTab === 'overview' && (
                    <div className="overview-section">
                        <div className="overview-grid">
                            <div className="overview-card total-balance">
                                <h3>Total Balance</h3>
                                <div className="balance-amount">
                                    ${connectedWallets.reduce((sum, wallet) => sum + wallet.balance, 0).toLocaleString()}
                                </div>
                                <div className="balance-change positive">+2.5% (24h)</div>
                            </div>
                            
                            <div className="overview-card active-wallets">
                                <h3>Active Wallets</h3>
                                <div className="wallet-count">
                                    {connectedWallets.filter(w => w.status === 'Connected').length} / {connectedWallets.length}
                                </div>
                                <div className="wallet-types">
                                    Hardware: 1 • Software: 2
                                </div>
                            </div>
                            
                            <div className="overview-card recent-activity">
                                <h3>Recent Activity</h3>
                                <div className="activity-count">3</div>
                                <div className="activity-time">transactions today</div>
                            </div>
                            
                            <div className="overview-card security-status">
                                <h3>Security Status</h3>
                                <div className="security-level">Excellent</div>
                                <div className="security-score-small">{securityLevel}/100</div>
                            </div>
                        </div>
                        
                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="actions-grid">
                                <button className="action-card">
                                    <span className="action-icon">➕</span>
                                    <span className="action-label">Connect Wallet</span>
                                </button>
                                <button className="action-card">
                                    <span className="action-icon">💸</span>
                                    <span className="action-label">Send Crypto</span>
                                </button>
                                <button className="action-card">
                                    <span className="action-icon">📥</span>
                                    <span className="action-label">Receive Crypto</span>
                                </button>
                                <button className="action-card">
                                    <span className="action-icon">🔄</span>
                                    <span className="action-label">Swap Tokens</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'wallets' && (
                    <div className="wallets-section">
                        <div className="section-header">
                            <h2>Connected Wallets</h2>
                            <button className="add-wallet-btn">+ Connect New Wallet</button>
                        </div>
                        
                        <div className="wallets-grid">
                            {connectedWallets.map(wallet => (
                                <WalletCard key={wallet.id} wallet={wallet} />
                            ))}
                        </div>
                        
                        <div className="supported-wallets">
                            <h3>Supported Wallet Types</h3>
                            <div className="wallet-types-grid">
                                <div className="wallet-type-card">
                                    <div className="type-icon">🔐</div>
                                    <h4>Hardware Wallets</h4>
                                    <p>Ledger, Trezor, KeepKey</p>
                                </div>
                                <div className="wallet-type-card">
                                    <div className="type-icon">🌐</div>
                                    <h4>Browser Wallets</h4>
                                    <p>MetaMask, Coinbase Wallet</p>
                                </div>
                                <div className="wallet-type-card">
                                    <div className="type-icon">📱</div>
                                    <h4>Mobile Wallets</h4>
                                    <p>Trust Wallet, Exodus</p>
                                </div>
                                <div className="wallet-type-card">
                                    <div className="type-icon">💻</div>
                                    <h4>Desktop Wallets</h4>
                                    <p>Electrum, Atomic Wallet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="security-section">
                        <div className="security-header">
                            <h2>Security Features</h2>
                            <div className="security-score-display">
                                <SecurityScore score={securityLevel} />
                            </div>
                        </div>
                        
                        <div className="security-features-grid">
                            {securityFeatures.map((feature, index) => (
                                <SecurityFeature key={index} feature={feature} />
                            ))}
                        </div>
                        
                        <div className="security-recommendations">
                            <h3>Security Recommendations</h3>
                            <div className="recommendations-list">
                                <div className="recommendation-item completed">
                                    <span className="recommendation-icon">✅</span>
                                    <div className="recommendation-content">
                                        <h4>Enable Two-Factor Authentication</h4>
                                        <p>Add an extra layer of security to your account</p>
                                    </div>
                                </div>
                                <div className="recommendation-item completed">
                                    <span className="recommendation-icon">✅</span>
                                    <div className="recommendation-content">
                                        <h4>Connect Hardware Wallet</h4>
                                        <p>Use a hardware wallet for maximum security</p>
                                    </div>
                                </div>
                                <div className="recommendation-item">
                                    <span className="recommendation-icon">⚠️</span>
                                    <div className="recommendation-content">
                                        <h4>Set Up Recovery Phrase Backup</h4>
                                        <p>Securely store your recovery phrase offline</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'transactions' && (
                    <div className="transactions-section">
                        <div className="section-header">
                            <h2>Transaction History</h2>
                            <div className="transaction-filters">
                                <select className="filter-select">
                                    <option value="all">All Types</option>
                                    <option value="sent">Sent</option>
                                    <option value="received">Received</option>
                                </select>
                                <select className="filter-select">
                                    <option value="all">All Status</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="transactions-list">
                            {transactionHistory.map(transaction => (
                                <TransactionItem key={transaction.id} transaction={transaction} />
                            ))}
                        </div>
                        
                        <div className="transaction-stats">
                            <h3>Transaction Statistics</h3>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span className="stat-number">24</span>
                                    <span className="stat-label">Total Transactions</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-number">$45,230</span>
                                    <span className="stat-label">Total Volume</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-number">$12.50</span>
                                    <span className="stat-label">Avg. Fee</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-number">2.5 min</span>
                                    <span className="stat-label">Avg. Confirmation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="features-showcase">
                <h2>Wallet Security Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔐</div>
                        <h3>Multi-Signature Security</h3>
                        <p>Require multiple signatures for transactions, providing an extra layer of protection against unauthorized access.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔑</div>
                        <h3>Hardware Wallet Support</h3>
                        <p>Seamlessly integrate with leading hardware wallets like Ledger and Trezor for maximum security.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">❄️</div>
                        <h3>Cold Storage</h3>
                        <p>Keep 95% of funds in cold storage, offline and protected from online threats and hacking attempts.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Insurance Protection</h3>
                        <p>Comprehensive insurance coverage up to $1 million protects your digital assets against theft and loss.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Real-time Monitoring</h3>
                        <p>24/7 security monitoring with instant alerts for suspicious activities and unauthorized access attempts.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Biometric Authentication</h3>
                        <p>Use fingerprint and facial recognition for secure and convenient access to your wallet.</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Ready to Secure Your Crypto Assets?</h2>
                <p>Join thousands of users who trust our platform with their cryptocurrency security</p>
                <div className="cta-buttons">
                    <Link to="/signup" className="primary-cta">Start Free Trial</Link>
                    <Link to="/pricing" className="secondary-cta">View Pricing</Link>
                </div>
            </div>
        </div>
    );
};

export default SecureWallet;