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
  MyMenu,
  MyAccount,
  MyFriends,
  MyGames,
  MyStats,
  MyLeaderboard
} from './pages/protected'
import { TrivialTrivia, Boredle } from './pages/protected/games'
import { BoredleContextProvider } from './context/boredleContext/boredleContext'
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
          <Route path="/me/games" element={<MyGames />}>
            <Route
              path="/me/games/trivial-trivia"
              element={<TrivialTrivia />}
            />
            <Route
              path="/me/games/boredle"
              element={
                <BoredleContextProvider>
                  <Boredle />
                </BoredleContextProvider>
              }
            />
          </Route>
        </Route>
        <Route path="/practice" element={<Practice />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
