import React from 'react'
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
