import React from 'react'
import io from 'socket.io-client'
import { socketBaseURL } from '../../../utils/baseURLs'
import { useAppContext } from '../../../context/appContext'
import MenuButton from './MenuButton'
import MapFriends from '../../friends/MapFriends'

const socket = io.connect(socketBaseURL)

const BoredleFriends = () => {
  const {
    friendsData: { friends }
  } = useAppContext()

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
