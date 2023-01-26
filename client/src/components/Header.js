import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Timer from './Timer'
import Avatar from './Avatar'
import { useTriviaContext } from '../context/trivia-context/triviaContext'
// import AvatarMenu from './AvatarMenu'

export default function Header() {
  const { pathname } = useLocation()
  const { user, practiceState, isLoading, showAlert } = useAppContext()
  const { mode } = useTriviaContext()
  const { practiceReady, practiceActive } = practiceState
  console.log(pathname)

  return (
    <header className="header">
      <div className="header__pfp">
        <Link
          to={user ? '/me/account' : '/'}
          className="header__pfp-link"
          style={{
            pointerEvents: isLoading || showAlert ? 'none' : ''
          }}
        >
          <Avatar
            type={user ? user.avatar : 'default'}
            avatarClass="header__pfp-avatar"
            defaultClass="header__pfp-icon"
          />
        </Link>
        {user && <h5 className="header__pfp-name text">{user.username}</h5>}
      </div>
      {pathname === '/me/games/trivial-trivia' &&
        mode === 'practice' &&
        (practiceReady || practiceActive) && <Timer />}
    </header>
  )
}
