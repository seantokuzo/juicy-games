import React from 'react'
import {
  GiStrawberry,
  GiOrangeSlice,
  GiBananaBunch,
  GiRaspberry,
  GiGrapes
} from 'react-icons/gi'
import { useAppContext } from '../context/appContext'

export default function Footer() {
  const { user, theme, changeTheme, logoutUser, isLoading, showAlert } =
    useAppContext()

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
          disabled={isLoading || showAlert}
          />
        <GiOrangeSlice
          className={
            theme === 'orange'
            ? 'footer__fruit footer__fruit-orange footer__fruit--selected'
            : 'footer__fruit footer__fruit-orange'
          }
          onClick={() => changeTheme('orange')}
          disabled={isLoading || showAlert}
          />
        <GiBananaBunch
          className={
            theme === 'banana'
            ? 'footer__fruit footer__fruit-banana footer__fruit--selected'
            : 'footer__fruit footer__fruit-banana'
          }
          onClick={() => changeTheme('banana')}
          disabled={isLoading || showAlert}
          />
        <GiRaspberry
          className={
            theme === 'berry'
            ? 'footer__fruit footer__fruit-berry footer__fruit--selected'
            : 'footer__fruit footer__fruit-berry'
          }
          onClick={() => changeTheme('berry')}
          disabled={isLoading || showAlert}
          />
        <GiGrapes
          className={
            theme === 'grape'
            ? 'footer__fruit footer__fruit-grape footer__fruit--selected'
            : 'footer__fruit footer__fruit-grape'
          }
          onClick={() => changeTheme('grape')}
          disabled={isLoading || showAlert}
        />
      </div>
    </footer>
  )
}
