import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Timer from './Timer'
// import AvatarMenu from './AvatarMenu'

export default function Header() {
  const { pathname } = useLocation()
  const { user, practiceState } = useAppContext()
  const { practiceReady, practiceActive } = practiceState

  const pfp = <i className="fa-solid fa-user header__pfp-icon"></i>

  return (
    <header className="header">
      <div className="header__pfp-div">
        <Link to={user ? '/game/me' : '/'} className="header__pfp-link">
          {pfp}
        </Link>
        {user && <h5 className="header__pfp-name text">{user.username}</h5>}
      </div>
      {/* {pathname === '/game/me' && <AvatarMenu />} */}
      {pathname === '/practice' && (practiceReady || practiceActive) && (
        <Timer />
      )}
    </header>
  )
}
