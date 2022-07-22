import React from 'react'
import {
  GiStrawberry,
  GiOrangeSlice,
  GiBananaBunch,
  GiGrapes
} from 'react-icons/gi'
import { useAppContext } from '../context/appContext'

export default function Footer() {
  const { user, theme, changeTheme, logoutUser } = useAppContext()

  return (
    <footer className="footer">
      {/* <p className="text footer__text">A seantokuzo game</p> */}
      {user && (
        <button type="button" className="btn" onClick={logoutUser}>
          Logout {user.username}
        </button>
      )}
      <div className="footer__fruits">
        <GiStrawberry
          className={
            theme === 'strawberry'
              ? 'footer__fruit footer__fruit-strawberry footer__fruit--selected'
              : 'footer__fruit footer__fruit-strawberry'
          }
          onClick={() => changeTheme('strawberry')}
        />
        <GiOrangeSlice
          className={
            theme === 'orange'
              ? 'footer__fruit footer__fruit-orange footer__fruit--selected'
              : 'footer__fruit footer__fruit-orange'
          }
          onClick={() => changeTheme('orange')}
        />
        <GiBananaBunch
          className={
            theme === 'banana'
              ? 'footer__fruit footer__fruit-banana footer__fruit--selected'
              : 'footer__fruit footer__fruit-banana'
          }
          onClick={() => changeTheme('banana')}
        />
        <GiGrapes
          className={
            theme === 'grape'
              ? 'footer__fruit footer__fruit-grape footer__fruit--selected'
              : 'footer__fruit footer__fruit-grape'
          }
          onClick={() => changeTheme('grape')}
        />
      </div>
    </footer>
  )
}
