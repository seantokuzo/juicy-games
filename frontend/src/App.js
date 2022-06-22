import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from './context/appContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'
import './scss/main.scss'

function App() {
  const { retrieveCategories, updateGameOptions } = useAppContext()

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.trivia_categories)
        retrieveCategories(data.trivia_categories.slice(0, data.trivia_categories.length - 2))
        updateGameOptions({ target: { name: 'category', value: data.trivia_categories[0].id } })
      })
      .catch((err) => console.log(err))
  }, [])

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
