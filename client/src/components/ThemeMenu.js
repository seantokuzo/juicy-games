import React from 'react'
import {
  GiStrawberry,
  GiOrangeSlice,
  GiBananaBunch,
  GiRaspberry,
  GiGrapes
} from 'react-icons/gi'
import { useAppContext } from '../context/appContext'

const ThemeMenu = ({ custom }) => {
  const { theme, changeTheme, isLoading, showAlert } = useAppContext()

  return (
    <div
      className={
        custom ? 'themes__fruits themes__fruits-custom' : 'themes__fruits'
      }
    >
      <GiStrawberry
        className={
          theme === 'strawberry'
            ? 'themes__fruit themes__fruit-strawberry themes__fruit--selected'
            : 'themes__fruit themes__fruit-strawberry'
        }
        onClick={() => changeTheme('strawberry')}
        disabled={isLoading || showAlert}
      />
      <GiOrangeSlice
        className={
          theme === 'orange'
            ? 'themes__fruit themes__fruit-orange themes__fruit--selected'
            : 'themes__fruit themes__fruit-orange'
        }
        onClick={() => changeTheme('orange')}
        disabled={isLoading || showAlert}
      />
      <GiBananaBunch
        className={
          theme === 'banana'
            ? 'themes__fruit themes__fruit-banana themes__fruit--selected'
            : 'themes__fruit themes__fruit-banana'
        }
        onClick={() => changeTheme('banana')}
        disabled={isLoading || showAlert}
      />
      <GiRaspberry
        className={
          theme === 'berry'
            ? 'themes__fruit themes__fruit-berry themes__fruit--selected'
            : 'themes__fruit themes__fruit-berry'
        }
        onClick={() => changeTheme('berry')}
        disabled={isLoading || showAlert}
      />
      <GiGrapes
        className={
          theme === 'grape'
            ? 'themes__fruit themes__fruit-grape themes__fruit--selected'
            : 'themes__fruit themes__fruit-grape'
        }
        onClick={() => changeTheme('grape')}
        disabled={isLoading || showAlert}
      />
    </div>
  )
}

export default ThemeMenu
