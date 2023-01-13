import React from 'react'
import {
  GiStrawberry,
  GiOrangeSlice,
  GiBananaBunch,
  GiRaspberry,
  GiGrapes
} from 'react-icons/gi'
import { useAppContext } from '../context/appContext'

const AvatarMenu = () => {
  const { updateAvatar, isLoading, showAlert } = useAppContext()

  const handleClick = (avatar) => {
    if (isLoading || showAlert) return
    updateAvatar(avatar)
  }

  return (
    <div className="avatars">
      <h3 className="avatars__title text">Pick a Fruit</h3>
      <div className="avatars__div">
        <GiStrawberry
          className="avatars__avatar avatars__avatar-strawberry"
          onClick={() => handleClick('strawberry')}
        />
        <GiOrangeSlice
          className="avatars__avatar avatars__avatar-orange"
          onClick={() => handleClick('orange')}
        />
        <GiBananaBunch
          className="avatars__avatar avatars__avatar-banana"
          onClick={() => handleClick('banana')}
        />
        <GiRaspberry
          className="avatars__avatar avatars__avatar-berry"
          onClick={() => handleClick('berry')}
        />
        <GiGrapes
          className="avatars__avatar avatars__avatar-grape"
          onClick={() => handleClick('grape')}
        />
      </div>
    </div>
  )
}

export default AvatarMenu
