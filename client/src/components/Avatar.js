import React from 'react'
import { useAppContext } from '../context/appContext'
import {
  GiStrawberry,
  GiOrangeSlice,
  GiBananaBunch,
  GiRaspberry,
  GiGrapes
} from 'react-icons/gi'

const Avatar = ({ type, avatarClass, defaultClass }) => {
  if (!type) {
    return <i className={`fa-solid fa-user ${defaultClass}`}></i>
  }
  if (type === 'default') {
    return <i className={`fa-solid fa-user ${defaultClass}`}></i>
  }
  if (type === 'strawberry') {
    return <GiStrawberry className={avatarClass} />
  }
  if (type === 'orange') {
    return <GiOrangeSlice className={avatarClass} />
  }
  if (type === 'banana') {
    return <GiBananaBunch className={avatarClass} />
  }
  if (type === 'berry') {
    return <GiRaspberry className={avatarClass} />
  }
  if (type === 'grape') {
    return <GiGrapes className={avatarClass} />
  }
  return <i className={`fa-solid fa-user ${defaultClass}`}></i>
}

export default Avatar
