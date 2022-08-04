import React, { useState } from 'react'
import { FaUserPlus, FaRegTrashAlt } from 'react-icons/fa'
import { useAppContext } from '../../context/appContext'
import Avatar from '../Avatar'
import Alert from '../Alert'

const FriendRequests = () => {
  const { friendsData, respondToFriendRequest, showAlert } = useAppContext()
  const { friendRequestsSent, friendRequestsReceived } = friendsData
  const [view, setView] = useState('received')
  console.log(friendRequestsSent)
  console.log(friendRequestsReceived)

  const toggleRequests = () => {
    if (view === 'sent') return setView('received')
    if (view === 'received') return setView('sent')
  }

  const requestList = (requestArray, type) => {
    if (requestArray && requestArray.length > 0) {
      return requestArray.map((req) => (
        <div key={req.username} className="friends__requests-request">
          <div className="friends__requests-details">
            <div className="friends__requests-details-top">
              <Avatar
                type={req.avatar}
                avatarClass="friends__avatar"
                defaultClass="friends__avatar--default"
              />
              <p className="friends__requests-username">{req.username}</p>
            </div>
            <p className="friends__requests-email text-mini">{req.email}</p>
          </div>
          {type === 'received' && (
            <div className="friends__requests-btns">
              <button
                type="button"
                className="btn friends__requests-btns-btn btn friends__requests-btns-btn-add"
                onClick={() => respondToFriendRequest(req.email, 'accept')}
              >
                <FaUserPlus />
              </button>
              <button
                type="button"
                className="btn friends__requests-btns-btn"
                onClick={() => respondToFriendRequest(req.email, 'reject')}
              >
                <FaRegTrashAlt />
              </button>
            </div>
          )}
        </div>
      ))
    }
    return <p className="text">Nothing to see here</p>
  }

  return (
    <div className="friends__requests">
      {showAlert && <Alert />}
      <h3 className="friends__requests-subtitle subtitle">
        {view === 'sent' && 'Pending Requests'}
        {view === 'received' && 'Requests Received'}
      </h3>
      {view === 'sent' && requestList(friendRequestsSent)}
      {view === 'received' && requestList(friendRequestsReceived, 'received')}
      <button
        type="button"
        className="btn btn-theme form-btn"
        onClick={toggleRequests}
      >
        {view === 'sent' && 'Requested You'}
        {view === 'received' && 'Requests Sent'}
      </button>
    </div>
  )
}

export default FriendRequests
