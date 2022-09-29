import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { useAppContext } from '../../../context/appContext'
import MenuButton from './MenuButton'
import MapFriends from '../../friends/MapFriends'

const socket = io.connect('http://localhost:5000')

const BoredleFriends = () => {
  const {
    // getMyFriends,
    // whoIsOnline,
    friendsData: { friends }
  } = useAppContext()

  // useEffect(() => {
  //   getMyFriends()
  // }, [])

  // useEffect(() => {
  //   socket.on('online_users', (data) => {
  //     const onlineUsers = data.map((userMap) => userMap[1])
  //     console.log('💥 Online Users:', onlineUsers)
  //     whoIsOnline(onlineUsers)
  //   })
  // }, [socket])

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
