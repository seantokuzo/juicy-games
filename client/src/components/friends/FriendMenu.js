import React from 'react'
import { useAppContext } from '../../context/appContext'
import { FaUserFriends } from 'react-icons/fa'
import { TbSend, TbMail } from 'react-icons/tb'
import { BiSearchAlt } from 'react-icons/bi'

const FriendMenu = ({ view, setView }) => {
  const {
    friendsData: { friendRequestsReceived },
    isLoading,
    showAlert
  } = useAppContext()

  const numReceived = friendRequestsReceived &&
    friendRequestsReceived.length > 0 && (
      <p className="friends__menu-number">{friendRequestsReceived.length}</p>
    )

  return (
    <div className="friends__menu">
      <button
        type="button"
        className={
          view === 'list'
            ? 'btn btn-theme friends__menu-btn friends__menu-btn--current'
            : 'btn friends__menu-btn'
        }
        onClick={() => setView('list')}
        disabled={isLoading || showAlert}
      >
        <FaUserFriends className="friends__menu--icon" />
      </button>
      <button
        type="button"
        className={
          view === 'requests'
            ? 'btn btn-theme friends__menu-btn friends__menu-btn--current'
            : 'btn friends__menu-btn'
        }
        onClick={() => setView('requests')}
        disabled={isLoading || showAlert}
      >
        {numReceived}
        <TbMail className="friends__menu--icon" />
      </button>
      <button
        type="button"
        className={
          view === 'finder'
            ? 'btn btn-theme friends__menu-btn friends__menu-btn--current'
            : 'btn friends__menu-btn'
        }
        onClick={() => setView('finder')}
        disabled={isLoading || showAlert}
      >
        <BiSearchAlt className="friends__menu--finder" />
      </button>
      <button
        type="button"
        className={
          view === 'send'
            ? 'btn btn-theme friends__menu-btn friends__menu-btn--current'
            : 'btn friends__menu-btn'
        }
        onClick={() => setView('send')}
        disabled={isLoading || showAlert}
      >
        <TbSend className="friends__menu--send" />
      </button>
    </div>
  )
}
export default FriendMenu
