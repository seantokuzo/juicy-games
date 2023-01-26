import React from 'react'
import ThemeMenu from './ThemeMenu'
import { useAppContext } from '../context/appContext'

export default function Footer() {
  const { user, theme, changeTheme, logoutUser, isLoading, showAlert } =
    useAppContext()

  return (
    <footer className="footer">
      {/* <p className="text footer__text">A seantokuzo game</p> */}
      {user && (
        <button type="button" className="btn" onClick={logoutUser}>
          Logout
        </button>
      )}
      <ThemeMenu />
    </footer>
  )
}
