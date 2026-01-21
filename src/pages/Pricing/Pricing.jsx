import React, { useState } from 'react'
import './Pricing.css'

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [selectedPlan, setSelectedPlan] = useState('pro');

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            description: 'Perfect for crypto beginners',
            monthlyPrice: 0,
            yearlyPrice: 0,
            popular: false,
            features: [
                'Track up to 100 cryptocurrencies',
                'Basic portfolio tracking',
                'Real-time price alerts (5 per day)',
                'Mobile app access',
                'Email support',
                'Basic market data',
                'Standard charts and graphs'
            ],
            limitations: [
                'Limited to 1 portfolio',
                'Basic analytics only',
                'No advanced trading tools'
            ]
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'For serious crypto traders',
            monthlyPrice: 29,
            yearlyPrice: 290,
            popular: true,
            features: [
                'Track unlimited cryptocurrencies',
                'Advanced portfolio analytics',
                'Unlimited price alerts',
                'AI-powered market insights',
                'Advanced charting tools',
                'DeFi protocol integration',
                'Priority email & chat support',
                'Tax reporting tools',
                'Multiple portfolio management',
                'API access (1000 calls/month)'
            ],
            limitations: []
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'For institutions and power users',
            monthlyPrice: 99,
            yearlyPrice: 990,
            popular: false,
            features: [
                'Everything in Pro',
                'White-label solutions',
                'Custom integrations',
                'Dedicated account manager',
                '24/7 phone support',
                'Advanced API access (unlimited)',
                'Custom reporting & analytics',
                'Multi-user team management',
                'Advanced security features',
                'Institutional-grade tools',
                'Custom data feeds',
                'SLA guarantee (99.9% uptime)'
            ],
            limitations: []
        }
    ];

    const addOns = [
        {
            name: 'Advanced Trading Bots',
            description: 'Automated trading strategies with AI optimization',
            price: 19,
            icon: '🤖'
        },
        {
            name: 'Premium Market Data',
            description: 'Real-time data from 500+ exchanges',
            price: 15,
            icon: '📊'
        },
        {
            name: 'Tax Pro Service',
            description: 'Professional tax preparation by certified CPAs',
            price: 49,
            icon: '📋'
        },
        {
            name: 'Portfolio Insurance',
            description: 'Protect your portfolio up to $100K',
            price: 25,
            icon: '🛡️'
        }
    ];

    const faqs = [
        {
            question: "Can I change my plan at any time?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and cryptocurrency payments including Bitcoin, Ethereum, and USDC."
        },
        {
            question: "Do you offer refunds?",
            answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll provide a full refund within 30 days of purchase."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use bank-level encryption, store data in secure facilities, and never share your information with third parties."
        },
        {
            question: "Can I cancel my subscription anytime?",
            answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
        }
    ];

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const getPrice = (plan) => {
        return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    };

    const getSavings = (plan) => {
        if (plan.monthlyPrice === 0) return 0;
        const monthlyTotal = plan.monthlyPrice * 12;
        const yearlySavings = monthlyTotal - plan.yearlyPrice;
        return Math.round((yearlySavings / monthlyTotal) * 100);
    };

    return (
        <div className='pricing'>
            <div className="pricing-hero">
                <h1>Choose Your Perfect Plan</h1>
                <p>Start free, scale as you grow. All plans include our core features with no hidden fees.</p>
                
                <div className="billing-toggle">
                    <button 
                        className={billingCycle === 'monthly' ? 'active' : ''}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Monthly
                    </button>
                    <button 
                        className={billingCycle === 'yearly' ? 'active' : ''}
                        onClick={() => setBillingCycle('yearly')}
                    >
                        Yearly
                        <span className="savings-badge">Save up to 20%</span>
                    </button>
                </div>
            </div>

            <div className="pricing-plans">
                {plans.map((plan) => (
                    <div 
                        key={plan.id} 
                        className={`pricing-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPlan(plan.id)}
                    >
                        {plan.popular && <div className="popular-badge">Most Popular</div>}
                        
                        <div className="plan-header">
                            <h3>{plan.name}</h3>
                            <p>{plan.description}</p>
                            <div className="price">
                                <span className="currency">$</span>
                                <span className="amount">{getPrice(plan)}</span>
                                <span className="period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                            </div>
                            {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                                <div className="savings">Save {getSavings(plan)}% annually</div>
                            )}
                        </div>

                        <div className="plan-features">
                            <ul>
                                {plan.features.map((feature, index) => (
                                    <li key={index}>
                                        <span className="check-icon">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            {plan.limitations.length > 0 && (
                                <div className="limitations">
                                    <h5>Limitations:</h5>
                                    <ul>
                                        {plan.limitations.map((limitation, index) => (
                                            <li key={index}>
                                                <span className="x-icon">✗</span>
                                                {limitation}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button className={`plan-button ${plan.id === 'starter' ? 'free' : ''}`}>
                            {plan.id === 'starter' ? 'Get Started Free' : 'Start Free Trial'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="add-ons-section">
                <h2>Enhance Your Experience</h2>
                <p>Supercharge your crypto journey with our premium add-ons</p>
                
                <div className="add-ons-grid">
                    {addOns.map((addon, index) => (
                        <div key={index} className="addon-card">
                            <div className="addon-icon">{addon.icon}</div>
                            <h4>{addon.name}</h4>
                            <p>{addon.description}</p>
                            <div className="addon-price">
                                <span>${addon.price}/month</span>
                                <button className="addon-button">Add to Plan</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="comparison-table">
                <h2>Compare All Features</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Features</th>
                                <th>Starter</th>
                                <th>Pro</th>
                                <th>Enterprise</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cryptocurrency Tracking</td>
                                <td>100 coins</td>
                                <td>Unlimited</td>
                                <td>Unlimited</td>
                            </tr>
                            <tr>
                                <td>Portfolio Management</td>
                                <td>1 portfolio</td>
                                <td>Unlimited</td>
                                <td>Unlimited</td>
                            </tr>
                            <tr>
                                <td>Price Alerts</td>
                                <td>5 per day</td>
                                <td>Unlimited</td>
                                <td>Unlimited</td>
                            </tr>
                            <tr>
                                <td>AI Market Insights</td>
                                <td>✗</td>
                                <td>✓</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>Advanced Charts</td>
                                <td>✗</td>
                                <td>✓</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>API Access</td>
                                <td>✗</td>
                                <td>1K calls/month</td>
                                <td>Unlimited</td>
                            </tr>
                            <tr>
                                <td>Support</td>
                                <td>Email</td>
                                <td>Email & Chat</td>
                                <td>24/7 Phone</td>
                            </tr>
                            <tr>
                                <td>Custom Integrations</td>
                                <td>✗</td>
                                <td>✗</td>
                                <td>✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                            <button 
                                className="faq-question"
                                onClick={() => toggleFaq(index)}
                            >
                                {faq.question}
                                <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                            </button>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pricing-cta">
                <div className="cta-content">
                    <h2>Ready to Start Your Crypto Journey?</h2>
                    <p>Join thousands of traders who trust Cryptoplace for their cryptocurrency needs</p>
                    <div className="cta-buttons">
                        <button className="primary-cta">Start 14-Day Free Trial</button>
                        <button className="secondary-cta">Contact Sales</button>
                    </div>
                    <div className="trust-indicators">
                        <div className="trust-item">
                            <span className="trust-icon">🔒</span>
                            <span>Bank-level security</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">💳</span>
                            <span>No credit card required</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">↩️</span>
                            <span>30-day money back</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;