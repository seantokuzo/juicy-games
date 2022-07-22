import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Timer from './Timer'

export default function Header() {
  const { pathname } = useLocation()
  const { user, practiceState } = useAppContext()
  const { practiceReady, practiceActive, practiceOptions } = practiceState

  const pfp = <i className="fa-solid fa-user header__pfp-icon"></i>

  return (
    <header className="header">
      <div className="header__pfp-div">
        <Link to={user ? '/game/me' : '/'} className="header__pfp-link">
          {pfp}
        </Link>
        {user && <h5 className="header__pfp-name text">{user.username}</h5>}
      </div>
      {pathname === '/practice' && (practiceReady || practiceActive) && <Timer />}
    </header>
  )
}
