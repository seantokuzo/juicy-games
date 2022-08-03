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
  ResetPassword,
  Error
} from './pages'
import {
  AuthSharedLayout,
  MyAccount,
  MyFriends,
  MyMenu,
  MyLeaderboard,
  MyStats
} from './pages/protected'
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
          path="/me"
          element={
            <ProtectedRoute>
              <AuthSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyMenu />} />
          <Route path="/me/account" element={<MyAccount />} />
          <Route path="/me/friends" element={<MyFriends />} />
          <Route path="/me/stats" element={<MyStats />} />
          <Route path="/me/leaderboard" element={<MyLeaderboard />} />
        </Route>
        <Route path="/practice" element={<Practice />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
