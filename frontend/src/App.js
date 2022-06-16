import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'
import './scss/main.scss'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
