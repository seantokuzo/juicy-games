import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const AccountLinks = () => {
  const { pathname } = useLocation()
  const { isLoading, showAlert } = useAppContext()

  return (
    <div className="links-div">
      {pathname !== '/me' && (
        <Link
          to="/me"
          className="btn btn-theme link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>My Trivia</h3>
        </Link>
      )}
      {pathname !== '/me/account' && (
        <Link
          to="/me/account"
          className="btn btn-theme link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Account</h3>
        </Link>
      )}
      {pathname !== '/me/friends' && (
        <Link
          to="/me/friends"
          className="btn btn-theme link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Friends</h3>
        </Link>
      )}
      {pathname !== '/me/stats' && (
        <Link
          to="/me/stats"
          className="btn btn-theme link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Stats</h3>
        </Link>
      )}
      {pathname !== '/me/leaderboard' && (
        <Link
          to="/me/leaderboard"
          className="btn btn-theme link account__links-link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Leaderboard</h3>
        </Link>
      )}
      <Link
        to="/practice"
        className="btn btn-theme link account__links-link"
        style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
      >
        <h3>Practice</h3>
      </Link>
    </div>
  )
}

export default AccountLinks
