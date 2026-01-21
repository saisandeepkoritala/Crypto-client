import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.navbar')) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isMenuOpen])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    const currencyHandler = (event) => {
        switch (event.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
            case "eur": {
                setCurrency({ name: "eur", symbol: "€" });
                break;
            }
            case "inr": {
                setCurrency({ name: "inr", symbol: "₹" });
                break;
            }
            default: {
                setCurrency({ name: "usd", symbol: "$" });
                break;
            }
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <div className='navbar'>
            {/* Logo */}
            <Link to={'/'} onClick={closeMenu}>
                <img src={logo} alt="Cryptoplace" className='logo' />
            </Link>

            {/* Hamburger Menu Button */}
            <button 
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Navigation Links */}
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li>
                    <Link to={'/'} onClick={closeMenu}>Home</Link>
                </li>
                <li>
                    <Link to={'/features'} onClick={closeMenu}>Features</Link>
                </li>
                <li>
                    <Link to={'/pricing'} onClick={closeMenu}>Pricing</Link>
                </li>
                <li>
                    <Link to={'/blog'} onClick={closeMenu}>Blog</Link>
                </li>
            </ul>

            {/* Right Side Controls */}
            <div className="nav-right">
                {/* Currency Selection */}
                <select onChange={currencyHandler} className="currency-select">
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                </select>

                {/* Sign up Button */}
                <Link to="/signup" onClick={closeMenu}>
                    <button className="signup-btn">
                        <span>Sign up</span>
                        <img src={arrow_icon} alt="" />
                    </button>
                </Link>
            </div>

            {/* Mobile Overlay */}
            {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
        </div>
    )
}

export default Navbar