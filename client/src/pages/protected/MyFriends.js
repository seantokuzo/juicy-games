import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { BiRefresh } from 'react-icons/bi'
import { useAppContext } from '../../context/appContext'
import {
  FriendFinder,
  FriendRequestForm,
  FriendsList,
  FriendRequests,
  FriendMenu,
  MenuLink,
  Alert,
  ButtonLink
} from '../../components'

const socket = io.connect('http://localhost:5000')

const MyFriends = () => {
  const [view, setView] = useState('list')
  const { getMyFriends, whoIsOnline, isLoading, showAlert } = useAppContext()

  useEffect(() => {
    getMyFriends()
    socket.emit('get_online_users', socket.id)
  }, [])

  useEffect(() => {
    socket.on('online_users', (data) => {
      // console.log('💥 Online Users:')
      const onlineUsers = data.map((userMap) => userMap[0])
      whoIsOnline(onlineUsers)
    })
  }, [socket])

  const getPageTitle = () => {
    if (view === 'list') return 'My Friends'
    if (view === 'requests') return ''
    if (view === 'finder') return 'Find a Buddy'
    if (view === 'send') return 'Request a Friend'
    return 'My Friends'
  }

  const getComponent = () => {
    if (view === 'list') return <FriendsList />
    if (view === 'requests') return <FriendRequests />
    if (view === 'finder') return <FriendFinder />
    if (view === 'send') return <FriendRequestForm />
    return 'My Friends'
  }

  return (
    <section className="friends">
      <div className="form friends__form">
        {showAlert && <Alert />}
        {(view === 'list' || view === 'requests') && (
          <button
            type="button"
            className="friends__refresh btn btn-theme"
            onClick={getMyFriends}
            disabled={isLoading || showAlert}
          >
            <BiRefresh />
          </button>
        )}
        <h1 className="friends__title title">{getPageTitle()}</h1>
        {getComponent()}
      </div>
      <FriendMenu view={view} setView={setView} />
      {/* <MenuLink /> */}
      <ButtonLink path="/me" btnClass="link" text="Main Menu" />
    </section>
  )
}

export default MyFriends

// const pageTitle =
//   view === 'list'
//     ? 'My Friends'
//     : view === 'sent'
//     ? 'Sent Requests'
//     : view === 'received'
//     ? 'Received Requests'
//     : view === 'send'
//     ? 'Request a Buddy'
//     : 'Find New Friends'
