import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const AccountLinks = () => {
  const { pathname } = useLocation()
  const { isLoading, showAlert } = useAppContext()

  return (
    <div className="links-div">
      {pathname !== '/game' && (
        <Link
          to="/game"
          className="btn link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>My Trivia</h3>
        </Link>
      )}
      {pathname !== '/game/me' && (
        <Link
          to="/game/me"
          className="btn link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>My Account</h3>
        </Link>
      )}
      {pathname !== '/game/my-stats' && (
        <Link
          to="/game/my-stats"
          className="btn link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>My Stats</h3>
        </Link>
      )}
      {pathname !== '/game/leaderboard' && (
        <Link
          to="/game/leaderboard"
          className="btn link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Leaderboard</h3>
        </Link>
      )}
    </div>
  )
}

export default AccountLinks
