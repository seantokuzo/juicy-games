import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useAppContext } from '../../context/appContext'

const AuthSharedLayout = () => {
  const socket = useRef()
  const { user } = useAppContext()

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:5000')
      socket.current.emit('add-user', user._id)
    }
  }, [user])

  return (
    <main className="auth-shared">
      <Outlet />
    </main>
  )
}

export default AuthSharedLayout
