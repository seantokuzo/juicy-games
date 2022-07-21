import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthSharedLayout = () => {
  return (
    <main>
      <h1>AuthSharedLayout</h1>
      <Outlet />
    </main>
  )
}

export default AuthSharedLayout
