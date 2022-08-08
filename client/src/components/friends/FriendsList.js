import React, { useState } from 'react'
// import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { useAppContext } from '../../context/appContext'
import MapFriends from './MapFriends'

const FriendsList = () => {
  const {
    friendsData: { friends }
  } = useAppContext()

  return (
    <div className="friends__map">
      <MapFriends dataArray={friends} type="list" />
    </div>
  )
}

export default FriendsList
