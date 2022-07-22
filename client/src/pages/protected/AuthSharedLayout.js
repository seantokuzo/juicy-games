import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthSharedLayout = () => {
  return (
    <main className="auth-shared">
      <Outlet />
    </main>
  )
}

export default AuthSharedLayout
