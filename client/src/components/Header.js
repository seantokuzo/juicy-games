import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Timer from './Timer'

export default function Header() {
  const { pathname } = useLocation()
  const { user, gameReady, gameActive, gameOptions } = useAppContext()

  const pfp = <i className="fa-solid fa-user header__pfp-icon"></i>

  return (
    <header className="header">
      <div className="header__pfp-div">
        {pfp}
        {user && <h5 className="header__pfp-name text">{user.username}</h5>}
      </div>
      {pathname === '/practice' && (gameReady || gameActive) && <Timer />}
    </header>
  )
}
