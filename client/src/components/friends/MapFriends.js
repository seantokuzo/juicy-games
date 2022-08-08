import React, { useState } from 'react'
import { FaUser, FaUserPlus, FaRegTrashAlt } from 'react-icons/fa'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useAppContext } from '../../context/appContext'

const MapFriends = ({ dataArray, type }) => {
  const [page, setPage] = useState(1)
  const {
    friendsData: { friends },
    requestFriend,
    respondToFriendRequest,
    removeFriend,
    isLoading,
    showAlert
  } = useAppContext()

  const limit = 3
  const indexOne = (page - 1) * limit
  const indexTwo = page * limit - 1

  const numPages = Math.ceil(dataArray.length / limit)
  console.log(dataArray)
  console.log(numPages)

  const changePage = (arg) => {
    if (typeof arg === 'number') {
      setPage(arg)
      return
    }
    if (arg === 'prev') {
      if (page > 1) return setPage(page - 1)
      if (page === 1) return setPage(numPages)
    }
    if (arg === 'next') {
      if (page < numPages) return setPage(page + 1)
      if (page === numPages) return setPage(1)
    }
  }

  const pageToggles = numPages > 1 && (
    <div className="toggles">
      {numPages > 1 && (
        <AiFillCaretLeft
          className="toggles__page toggles__page-caret"
          onClick={() => changePage('prev')}
        />
      )}
      {new Array(numPages).fill(1).map((x, i) => {
        return (
          <p
            key={`friend-list-toggle${i + 1}`}
            className={
              i + 1 === page
                ? 'toggles__page toggles__page-number--current'
                : 'toggles__page toggles__page-number'
            }
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </p>
        )
      })}
      <AiFillCaretRight
        className="toggles__page toggles__page-caret"
        onClick={() => changePage('next')}
      />
    </div>
  )

  if (dataArray && dataArray.length > 0) {
    return (
      <div className="friends__map-container">
        {dataArray.map((person, i) => {
          if (i >= indexOne && i <= indexTwo) {
            return (
              <div key={person.username} className="friends__map-person">
                <div className="friends__map-details">
                  <div className="friends__map-details-top">
                    <Avatar
                      type={person.avatar}
                      avatarClass={`friends__avatar clr-${person.avatar}`}
                      defaultClass="friends__avatar--default"
                    />
                    <p className="friends__map-username">{person.username}</p>
                  </div>
                  {type !== 'finder' && (
                    <p className="friends__map-email text-mini">
                      {person.email}
                    </p>
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
                        if (type === 'finder')
                          return requestFriend(person.username)
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
        })}
        {pageToggles}
      </div>
    )
  }
  return <p className="friends__map-nada text">Nothing to see here</p>
}

export default MapFriends
