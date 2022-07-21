import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthSharedLayout = () => {
  return (
    <main className="page auth-shared">
      <p className="text">AuthSharedLayout</p>
      <Outlet />
    </main>
  )
}

export default AuthSharedLayout
