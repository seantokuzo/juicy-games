import React, { useState } from 'react'
import { FaUser, FaUserPlus, FaRegTrashAlt } from 'react-icons/fa'
import Avatar from '../Avatar'
import { useAppContext } from '../../context/appContext'

const MapFriends = ({ dataArray, type, page = 1, limit = 3 }) => {
  const {
    friendsData: { friends },
    requestFriend,
    respondToFriendRequest,
    removeFriend,
    isLoading,
    showAlert
  } = useAppContext()

  const indexOne = (page - 1) * limit
  const indexTwo = page * limit - 1

  if (dataArray && dataArray.length > 0) {
    return dataArray.map((person, i) => {
      if (i >= indexOne && i <= indexTwo) {
        return (
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
              {type !== 'finder' && (
                <p className="friends__map-email text-mini">{person.email}</p>
              )}
            </div>
            <div className="friends__map-btns">
              {(type === 'received' || type === 'finder') && (
                <button
                  type="button"
                  className="btn friends__map-btns-btn btn friends__map-btns-btn-add"
                  onClick={() => {
                    if (
                      !friends.every(
                        (friend) => friend.username !== person.username
                      )
                    ) {
                      return
                    }
                    if (type === 'received')
                      return respondToFriendRequest(person.email, 'accept')
                    if (type === 'finder') return requestFriend(person.username)
                  }}
                  disabled={
                    isLoading ||
                    showAlert ||
                    !friends.every(
                      (friend) => friend.username !== person.username
                    )
                  }
                >
                  {friends.every(
                    (friend) => friend.username !== person.username
                  ) ? (
                    <FaUserPlus />
                  ) : (
                    <FaUser />
                  )}
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
        )
      }
    })
  }
  return <p className="friends__map-nada text">Nothing to see here</p>
}

export default MapFriends
