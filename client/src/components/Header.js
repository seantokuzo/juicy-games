import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Timer from './game/Timer'

export default function Header() {
  const { pathname } = useLocation()
  const { gameReady, gameActive, gameOptions } = useAppContext()

  const pfp = <i className="fa-solid fa-user header__pfp-icon"></i>

  return (
    <header className="header">
      <div className="header__pfp-div">{pfp}</div>
      {pathname === '/game' && (gameReady || gameActive) && <Timer />}
    </header>
  )
}
