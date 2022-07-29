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
  const { updateAvatar } = useAppContext()

  return (
    <div className="avatars">
      <h3 className="avatars__title text">Pick a Fruit you Fruit</h3>
      <div className="avatars__div">
        <GiStrawberry
          className="avatars__avatar avatars__avatar-strawberry"
          onClick={() => updateAvatar('strawberry')}
        />
        <GiOrangeSlice
          className="avatars__avatar avatars__avatar-orange"
          onClick={() => updateAvatar('orange')}
        />
        <GiBananaBunch
          className="avatars__avatar avatars__avatar-banana"
          onClick={() => updateAvatar('banana')}
        />
        <GiRaspberry
          className="avatars__avatar avatars__avatar-berry"
          onClick={() => updateAvatar('berry')}
        />
        <GiGrapes
          className="avatars__avatar avatars__avatar-grape"
          onClick={() => updateAvatar('grape')}
        />
      </div>
    </div>
  )
}

export default AvatarMenu
