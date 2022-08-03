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
  const { user, practiceState, isLoading, showAlert } = useAppContext()
  const { practiceReady, practiceActive } = practiceState

  const whichAvatar = () => {
    if (user) {
      const { avatar } = user
      console.log(avatar)
      if (!avatar) {
        return <i className="fa-solid fa-user header__pfp-icon"></i>
      }
      if (avatar === 'default') {
        return <i className="fa-solid fa-user header__pfp-icon"></i>
      }
      if (avatar === 'strawberry') {
        return <GiStrawberry className="header__pfp-avatar" />
      }
      if (avatar === 'orange') {
        return <GiOrangeSlice className="header__pfp-avatar" />
      }
      if (avatar === 'banana') {
        return <GiBananaBunch className="header__pfp-avatar" />
      }
      if (avatar === 'berry') {
        return <GiRaspberry className="header__pfp-avatar" />
      }
      if (avatar === 'grape') {
        return <GiGrapes className="header__pfp-avatar" />
      }
    }
    return <i className="fa-solid fa-user header__pfp-icon"></i>
  }

  return (
    <header className="header">
      <div className="header__pfp">
        <Link
          to={user ? '/game/me' : '/'}
          className="header__pfp-link"
          style={{
            pointerEvents: isLoading || showAlert ? 'none' : ''
          }}
        >
          {whichAvatar()}
        </Link>
        {user && <h5 className="header__pfp-name text">{user.username}</h5>}
      </div>
      {pathname === '/practice' && (practiceReady || practiceActive) && (
        <Timer />
      )}
    </header>
  )
}
