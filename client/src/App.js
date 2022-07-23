import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAppContext } from './context/appContext'
import { Header, Footer } from './components/index.js'
import { Home, Practice, Leaderboard, ProtectedRoute } from './pages/index.js'
import {
  AuthSharedLayout,
  MyTrivia,
  MyLeaderboard,
  MyStats,
  MyAccount
} from './pages/protected/index.js'
import './scss/main.scss'

function App() {
  const { theme } = useAppContext()
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await fetch('/api/v1')
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // CHECK FOR TRIVIA STORED IN LCOAL STORAGE
  // useEffect(() => {
  //   const localTriv = JSON.parse(localStorage.getItem('localTrivia'))
  //   if (localTriv) {
  //     setPracticeTrivia(localTriv)
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
          <Route path="/game/me" element={<MyAccount />} />
          <Route path="/game/my-stats" element={<MyStats />} />
          <Route path="/game/leaderboard" element={<MyLeaderboard />} />
        </Route>
        <Route path="/practice" element={<Practice />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
