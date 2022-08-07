import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { GamesMenu, MenuLink } from '../../components'
import { useAppContext } from '../../context/appContext'

const MyGames = () => {
  const { pathname } = useLocation()
  const { isLoading, showAlert } = useAppContext()

  return (
    <div className="game page">
      {pathname === '/me/games' && <GamesMenu />}
      <Outlet />
      {pathname === '/me/games' && <MenuLink />}
    </div>
  )
}

export default MyGames
