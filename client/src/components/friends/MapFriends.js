import React from 'react'
import { FaUserPlus, FaRegTrashAlt } from 'react-icons/fa'
import Avatar from '../Avatar'
import { useAppContext } from '../../context/appContext'

const MapFriends = ({ dataArray, type }) => {
  const { respondToFriendRequest, removeFriend, isLoading, showAlert } =
    useAppContext()

  if (dataArray && dataArray.length > 0) {
    return dataArray.map((person) => (
      <div key={person.username} className="friends__map-person">
        <div className="friends__map-details">
          <div className="friends__map-details-top">
            <Avatar
              type={person.avatar}
              avatarClass="friends__avatar"
              defaultClass="friends__avatar--default"
            />
            <p className="friends__map-username">{person.username}</p>
          </div>
          <p className="friends__map-email text-mini">{person.email}</p>
        </div>
        <div className="friends__map-btns">
          {type === 'received' && (
            <button
              type="button"
              className="btn friends__map-btns-btn btn friends__map-btns-btn-add"
              onClick={() => respondToFriendRequest(person.email, 'accept')}
              disabled={isLoading || showAlert}
            >
              <FaUserPlus />
            </button>
          )}
          {(type === 'list' || type === 'received') && (
            <button
              type="button"
              className="btn friends__map-btns-btn"
              onClick={() => {
                if (type === 'list') {
                  removeFriend(person.email)
                }
                if (type === 'received') {
                  respondToFriendRequest(person.email, 'reject')
                }
              }}
              disabled={isLoading || showAlert}
            >
              <FaRegTrashAlt />
            </button>
          )}
        </div>
      </div>
    ))
  }
  return <p className="friends__map-nada text">Nothing to see here</p>
}

export default MapFriends
