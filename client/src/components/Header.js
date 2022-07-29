import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import {
  GiStrawberry,
  GiOrangeSlice,
  GiBananaBunch,
  GiRaspberry,
  GiGrapes
} from 'react-icons/gi'
import Timer from './Timer'
// import AvatarMenu from './AvatarMenu'

export default function Header() {
  const { pathname } = useLocation()
  const { user, practiceState } = useAppContext()
  const { practiceReady, practiceActive } = practiceState

  const whichAvatar = () => {
    if (user) {
      const { avatar } = user
      if (!avatar) {
        return <i className="fa-solid fa-user header__pfp-icon"></i>
      }
      if (avatar === 'default') {
        return <i className="fa-solid fa-user header__pfp-icon"></i>
      }
      if (avatar === 'strawberry') {
        return <GiStrawberry />
      }
      if (avatar === 'orange') {
        return <GiOrangeSlice />
      }
      if (avatar === 'banana') {
        return <GiBananaBunch />
      }
      if (avatar === 'berry') {
        return <GiRaspberry />
      }
      if (avatar === 'grape') {
        return <GiGrapes />
      }
    }
    return <i className="fa-solid fa-user header__pfp-icon"></i>
  }

  return (
    <header className="header">
      <div className="header__pfp-div">
        <Link to={user ? '/game/me' : '/'} className="header__pfp-link">
          {whichAvatar()}
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
