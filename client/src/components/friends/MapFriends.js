import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {
  FaUser,
  FaUserPlus,
  FaRegTrashAlt,
  FaRegHandshake
} from 'react-icons/fa'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { TbSwords } from 'react-icons/tb'
import Avatar from '../Avatar'
import { useAppContext } from '../../context/appContext'
import { useBoredleContext } from '../../context/boredle-context/boredleContext'

const socket = io.connect('https://juicy-games.onrender.com/')

const MapFriends = ({ dataArray, type, customLimit }) => {
  const [page, setPage] = useState(1)
  const {
    friendsData: { friends },
    onlineFriends,
    requestFriend,
    respondToFriendRequest,
    removeFriend,
    isLoading,
    showAlert,
    whoIsOnline,
    getMyFriends
  } = useAppContext()
  const { startBoredleBattle, startBoredleTeam } = useBoredleContext()

  useEffect(() => {
    // console.log('MapFriends: GetMyFriends()')
    getMyFriends()
  }, [])

  useEffect(() => {
    socket.emit('get_online_users', socket.id)
    // console.log('💥 SocketEmit: Get Online Users')
  }, [friends])

  useEffect(() => {
    socket.on('online_users', (data) => {
      const onlineUsers = data.map((userMap) => userMap[1])
      whoIsOnline(onlineUsers)
    })
  }, [socket, friends])

  const limit = customLimit || 3
  const indexOne = (page - 1) * limit
  const indexTwo = page * limit - 1

  const numPages = Math.ceil(dataArray.length / limit)

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

  const addFriendButton = (person) => (
    <button
      type="button"
      className="btn friends__map-btns-btn btn friends__map-btns-btn-add"
      onClick={() => {
        if (!friends.every((friend) => friend.username !== person.username)) {
          return
        }
        if (type === 'received')
          return respondToFriendRequest(person.email, 'accept')
        if (type === 'finder') return requestFriend(person.username)
      }}
      disabled={
        isLoading ||
        showAlert ||
        !friends.every((friend) => friend.username !== person.username)
      }
    >
      {friends.every((friend) => friend.username !== person.username) ? (
        <FaUserPlus />
      ) : (
        <FaUser />
      )}
    </button>
  )

  const deleteFriendButton = (person) => (
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
  )

  const boredleButtons = (person) => (
    <>
      <button
        type="button"
        className="btn boredle__friends-btn boredle__friends-btn-battle"
        onClick={() => startBoredleBattle(person)}
      >
        <TbSwords />
      </button>
      <button
        type="button"
        className="btn boredle__friends-btn boredle__friends-btn-team"
        onClick={() => startBoredleTeam(person)}
      >
        <FaRegHandshake />
      </button>
    </>
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
                    {onlineFriends.includes(person._id) && (
                      <div className="friends__map-online-dot"></div>
                    )}
                  </div>
                  {type !== 'finder' && type !== 'boredle' && (
                    <p className="friends__map-email text-mini">
                      {person.email}
                    </p>
                  )}
                </div>
                <div className="friends__map-btns">
                  {(type === 'received' || type === 'finder') &&
                    addFriendButton(person)}
                  {(type === 'list' || type === 'received') &&
                    deleteFriendButton(person)}
                  {type === 'boredle' && boredleButtons(person)}
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
