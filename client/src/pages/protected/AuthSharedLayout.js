import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import io from 'socket.io-client'
import { socketBaseURL } from '../../utils/baseURLs'
import { useAppContext } from '../../context/appContext'

const socket = io.connect(socketBaseURL)

const AuthSharedLayout = () => {
  const { user } = useAppContext()

  // useEffect(() => {
  //   if (user) {
  //     socket.emit('login', user._id)
  //   }
  // }, [user])

  return (
    <main className="auth-shared">
      <Outlet />
    </main>
  )
}

export default AuthSharedLayout
