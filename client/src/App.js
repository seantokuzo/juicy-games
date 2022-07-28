import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from './context/appContext'
import { Header, Footer } from './components/index.js'
import {
  Home,
  Signup,
  Practice,
  Leaderboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword
} from './pages/index.js'
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

  return (
    <div className={`app ${theme}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
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
