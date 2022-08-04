import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import {
  FriendFinder,
  FriendRequestForm,
  FriendsList,
  FriendRequests,
  FriendMenu,
  MenuLink
} from '../../components'

const MyFriends = () => {
  const [view, setView] = useState('requests')
  console.log(view)
  const { getMyFriends } = useAppContext()

  useEffect(() => {
    getMyFriends()
  }, [])

  const getPageTitle = () => {
    if (view === 'list') return 'My Friends'
    if (view === 'requests') return 'Friend Requests'
    if (view === 'send') return 'Request a Friend'
    if (view === 'finder') return 'Find a Buddy'
    return 'My Friends'
  }

  const getComponent = () => {
    if (view === 'list') return <FriendsList />
    if (view === 'requests') return <FriendRequests />
    if (view === 'send') return <FriendRequestForm />
    if (view === 'finder') return <FriendFinder />
    return 'My Friends'
  }

  return (
    <section className="friends">
      <div className="form">
        <h1 className="friends__title title">{getPageTitle()}</h1>
        {getComponent()}
      </div>
      <FriendMenu setView={setView} />
      <MenuLink />
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
