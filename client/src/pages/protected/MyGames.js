import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { GamesMenu } from '../../components'
import { useAppContext } from '../../context/appContext'

const MyGames = () => {
  const { pathname } = useLocation()
  const { isLoading, showAlert } = useAppContext()

  return (
    <div className="game page">
      {pathname === '/me/games' && <GamesMenu />}
      <Outlet />
      {pathname !== '/me/games' && (
        <div className="links-div">
          <Link
            to="/me/games"
            className="btn form-btn"
            style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
          >
            <h3>Games Menu</h3>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyGames
