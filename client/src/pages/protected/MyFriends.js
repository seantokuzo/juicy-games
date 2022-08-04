import React, { useState, useEffect } from 'react'
import { BiRefresh } from 'react-icons/bi'
import { useAppContext } from '../../context/appContext'
import {
  FriendFinder,
  FriendRequestForm,
  FriendsList,
  FriendRequests,
  FriendMenu,
  MenuLink,
  Alert
} from '../../components'

const MyFriends = () => {
  const [view, setView] = useState('send')
  const { getMyFriends, isLoading, showAlert } = useAppContext()

  useEffect(() => {
    getMyFriends()
  }, [])

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
