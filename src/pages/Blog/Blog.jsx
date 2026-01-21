import React, { useContext, useEffect, useState } from 'react'
import './Blog.css'
import { CoinContext } from '../../context/CoinContext'

const Blog = () => {
    const { currency } = useContext(CoinContext);
    const [newsArticles, setNewsArticles] = useState([]);
    const [displayArticles, setDisplayArticles] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Mock news data - In a real app, this would come from a news API
    const mockNewsData = [
        {
            id: 1,
            title: "Bitcoin Reaches New All-Time High as Institutional Adoption Grows",
            excerpt: "Bitcoin surged to unprecedented levels as major corporations continue to add cryptocurrency to their balance sheets, signaling growing institutional confidence.",
            content: "The world's largest cryptocurrency has broken through previous resistance levels, driven by increased institutional adoption and growing acceptance as a store of value. Major companies including Tesla, MicroStrategy, and Square have allocated significant portions of their treasury to Bitcoin.",
            author: "Sarah Johnson",
            publishedAt: "2024-01-15T10:30:00Z",
            category: "bitcoin",
            image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Ethereum 2.0 Staking Rewards Attract Millions of Investors",
            excerpt: "The transition to proof-of-stake has created new opportunities for passive income, with over 32 million ETH now staked on the network.",
            content: "Ethereum's successful transition to proof-of-stake has revolutionized the network's energy consumption and created new investment opportunities. Validators are earning attractive yields while securing the network.",
            author: "Michael Chen",
            publishedAt: "2024-01-14T14:20:00Z",
            category: "ethereum",
            image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "4 min read"
        },
        {
            id: 3,
            title: "Central Bank Digital Currencies (CBDCs) Gain Momentum Worldwide",
            excerpt: "Over 100 countries are exploring or piloting digital versions of their national currencies, marking a significant shift in monetary policy.",
            content: "Central banks worldwide are accelerating their CBDC initiatives, with China leading the way with its digital yuan pilot programs. The European Central Bank and Federal Reserve are also making significant progress.",
            author: "Emma Rodriguez",
            publishedAt: "2024-01-13T09:15:00Z",
            category: "regulation",
            image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "6 min read"
        },
        {
            id: 4,
            title: "DeFi Protocol Launches Revolutionary Yield Farming Strategy",
            excerpt: "A new decentralized finance protocol promises higher yields with lower risk through innovative algorithmic trading strategies.",
            content: "The DeFi space continues to evolve with new protocols offering sophisticated yield optimization strategies. This latest innovation combines automated market making with dynamic rebalancing.",
            author: "David Kim",
            publishedAt: "2024-01-12T16:45:00Z",
            category: "defi",
            image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "7 min read"
        },
        {
            id: 5,
            title: "NFT Market Shows Signs of Recovery After Extended Downturn",
            excerpt: "Trading volumes and floor prices for major NFT collections have increased significantly over the past month, suggesting renewed interest.",
            content: "After months of declining activity, the NFT market is showing signs of stabilization. Blue-chip collections are seeing increased trading activity and rising floor prices.",
            author: "Lisa Wang",
            publishedAt: "2024-01-11T11:30:00Z",
            category: "nft",
            image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "5 min read"
        },
        {
            id: 6,
            title: "Cryptocurrency Regulation Framework Proposed by G20 Nations",
            excerpt: "Major economies collaborate on comprehensive regulatory guidelines to provide clarity for cryptocurrency businesses and investors.",
            content: "The G20 nations have proposed a unified framework for cryptocurrency regulation, aiming to balance innovation with consumer protection and financial stability.",
            author: "Robert Thompson",
            publishedAt: "2024-01-10T13:20:00Z",
            category: "regulation",
            image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "8 min read"
        },
        {
            id: 7,
            title: "Layer 2 Solutions Drive Ethereum Transaction Cost Reduction",
            excerpt: "Polygon, Arbitrum, and Optimism continue to process millions of transactions daily, significantly reducing costs for users.",
            content: "Layer 2 scaling solutions have successfully addressed Ethereum's scalability issues, with transaction costs dropping by over 90% compared to mainnet fees.",
            author: "Jennifer Lee",
            publishedAt: "2024-01-09T08:45:00Z",
            category: "ethereum",
            image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "6 min read"
        },
        {
            id: 8,
            title: "Cryptocurrency Mining Industry Embraces Renewable Energy",
            excerpt: "Major mining operations are transitioning to sustainable energy sources, addressing environmental concerns while maintaining profitability.",
            content: "The cryptocurrency mining industry is undergoing a green transformation, with over 60% of Bitcoin mining now powered by renewable energy sources.",
            author: "Alex Martinez",
            publishedAt: "2024-01-08T15:10:00Z",
            category: "mining",
            image: "https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=800",
            readTime: "5 min read"
        }
    ];

    // Simulate API call
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setNewsArticles(mockNewsData);
                setDisplayArticles(mockNewsData);
            } catch (err) {
                setError('Failed to fetch news articles');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Handle search input
    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
        if (event.target.value === "") {
            filterArticles('all', '');
        }
    };

    // Handle search form submission
    const handleSearch = (event) => {
        event.preventDefault();
        filterArticles(selectedCategory, searchInput);
    };

    // Handle category filter
    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        filterArticles(category, searchInput);
    };

    // Filter articles based on category and search term
    const filterArticles = (category, searchTerm) => {
        let filtered = newsArticles;

        // Filter by category
        if (category !== 'all') {
            filtered = filtered.filter(article => article.category === category);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setDisplayArticles(filtered);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className='blog'>
            <div className="blog-hero">
                <h1>Cryptocurrency News & Insights</h1>
                <p>Stay updated with the latest developments in the cryptocurrency world</p>
                
                <form onSubmit={handleSearch} className="blog-search">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchInput}
                        onChange={handleSearchInput}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>

            <div className="blog-filters">
                <button 
                    className={selectedCategory === 'all' ? 'active' : ''}
                    onClick={() => handleCategoryFilter('all')}
                >
                    All
                </button>
                <button 
                    className={selectedCategory === 'bitcoin' ? 'active' : ''}
                    onClick={() => handleCategoryFilter('bitcoin')}
                >
                    Bitcoin
                </button>
                <button 
                    className={selectedCategory === 'ethereum' ? 'active' : ''}
                    onClick={() => handleCategoryFilter('ethereum')}
                >
                    Ethereum
                </button>
                <button 
                    className={selectedCategory === 'defi' ? 'active' : ''}
                    onClick={() => handleCategoryFilter('defi')}
                >
                    DeFi
                </button>
                <button 
                    className={selectedCategory === 'nft' ? 'active' : ''}
                    onClick={() => handleCategoryFilter('nft')}
                >
                    NFT
                </button>
                <button 
                    className={selectedCategory === 'regulation' ? 'active' : ''}
                    onClick={() => handleCategoryFilter('regulation')}
                >
                    Regulation
                </button>
                <button 
                    className={selectedCategory === 'mining' ? 'active' : ''}
                    onClick={() => handleCategoryFilter('mining')}
                >
                    Mining
                </button>
            </div>

            <div className="blog-content">
                {displayArticles.length === 0 ? (
                    <div className="no-results">
                        <p>No articles found matching your search criteria.</p>
                    </div>
                ) : (
                    <div className="articles-grid">
                        {displayArticles.map((article) => (
                            <article key={article.id} className="article-card">
                                <div className="article-image">
                                    <img src={article.image} alt={article.title} />
                                    <div className="article-category">
                                        {article.category.toUpperCase()}
                                    </div>
                                </div>
                                <div className="article-content">
                                    <h2>{article.title}</h2>
                                    <p className="article-excerpt">{article.excerpt}</p>
                                    <div className="article-meta">
                                        <div className="author-info">
                                            <span className="author">By {article.author}</span>
                                            <span className="date">{formatDate(article.publishedAt)}</span>
                                        </div>
                                        <span className="read-time">{article.readTime}</span>
                                    </div>
                                    <button className="read-more">Read More</button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;