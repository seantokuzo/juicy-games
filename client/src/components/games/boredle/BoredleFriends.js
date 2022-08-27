import React, { useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import MenuButton from './MenuButton'
import MapFriends from '../../friends/MapFriends'
import Avatar from '../../Avatar'

const BoredleFriends = () => {
  const {
    getMyFriends,
    friendsData: { friends }
  } = useAppContext()
  // console.log(friends)

  useEffect(() => {
    getMyFriends()
  }, [])

  const friendsList = friends.map((friend) => (
    <div className="boredle__friends-friend"></div>
  ))

  return (
    <div className="boredle__friends page">
      <div className="form boredle__friends-list">
        <h3 className="title">Boredle with Friends</h3>
        <MapFriends dataArray={friends} type="boredle" customLimit={5} />
      </div>
      <MenuButton />
    </div>
  )
}

export default BoredleFriends
