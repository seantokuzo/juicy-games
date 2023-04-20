import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAppContext } from './context/appContext'
import { Header, Footer } from './components/index.js'
import {
  Home,
  Signup,
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
  MyGames
} from './pages/protected'
import { TrivialTrivia, Boredle } from './pages/protected/games'
import './scss/main.scss'

function App() {
  const { theme } = useAppContext()
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.classList.remove(
      'strawberry',
      'berry',
      'orange',
      'banana',
      'grape'
    )
    document.body.classList.add(`${theme}`)
  }, [theme])

  return (
    <div className={`app ${theme === 'default' ? 'strawberry' : theme}`}>
      {!pathname.startsWith('/me/games/boredle') && <Header />}
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
            <Route path="/me/games/boredle" element={<Boredle />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      {!pathname.startsWith('/me/games') && <Footer />}
    </div>
  )
}

export default App
