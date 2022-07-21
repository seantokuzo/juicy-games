import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAppContext } from './context/appContext'
import { Header, Footer } from './components/index.js'
import { Home, Practice, Leaderboard, ProtectedRoute } from './pages/index.js'
import { AuthSharedLayout, MyTrivia } from './pages/protected/index.js'
import './scss/main.scss'

function App() {
  const { setTrivia, retrieveCategories, updateGameOptions, theme } =
    useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        retrieveCategories(
          data.trivia_categories.slice(0, data.trivia_categories.length - 3)
        )
        updateGameOptions({
          target: { name: 'category', value: data.trivia_categories[0].id }
        })
      })
      .catch((err) => console.log(err))
  }, [])

  // CHECK FOR TRIVIA STORED IN LCOAL STORAGE
  // useEffect(() => {
  //   const localTriv = JSON.parse(localStorage.getItem('localTrivia'))
  //   if (localTriv) {
  //     setTrivia(localTriv)
  //     navigate('/game')
  //   }
  // }, [])

  return (
    <div className={`app ${theme}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <AuthSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyTrivia />} />
          <Route path="/me" element={<MyAccount />} />
          <Route path="/my-stats" element={<MyStats />} />
          <Route path="/leaderboard" element={<MyLeaderboard />} />
        </Route>
        <Route path="/practice" element={<Practice />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
