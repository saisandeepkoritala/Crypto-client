import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Blog from './pages/Blog/Blog'
import Features from './pages/Features/Features'
import Pricing from './pages/Pricing/Pricing'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Footer from './components/Footer/Footer'
import LineChart from './components/LineCart/LineCart'
import MarketData from './pages/Features/MarketData/MarketData'
import Portfolio from './pages/Features/Portfolio/Portfolio'
import AIAnalysis from './pages/Features/AiAnalysis/AiAnalysis'
import SecureWallet from './pages/Features/SecureWallet/SecureWallet'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/features' element={<Features />} />
        <Route path='/features/market-data' element={<MarketData />} />
        <Route path='/features/portfolio' element={<Portfolio />} />
        <Route path='/features/ai-analysis' element={<AIAnalysis />} />
        <Route path='/features/secure-wallet' element={<SecureWallet />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/line-chart' element={<LineChart />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App