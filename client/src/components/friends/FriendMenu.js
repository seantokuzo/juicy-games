import React from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { TbSend, TbMail } from 'react-icons/tb'
import { BiSearchAlt } from 'react-icons/bi'

const FriendMenu = ({ setView }) => {
  return (
    <div className="friends__menu">
      <button
        type="button"
        className="btn friends__menu-btn"
        onClick={() => setView('list')}
      >
        <FaUserFriends className="friends__menu--icon" />
      </button>
      <button
        type="button"
        className="btn friends__menu-btn"
        onClick={() => setView('requests')}
      >
        <TbMail className="friends__menu--icon" />
      </button>
      <button
        type="button"
        className="btn friends__menu-btn"
        onClick={() => setView('finder')}
      >
        <BiSearchAlt className="friends__menu--finder" />
      </button>
      <button
        type="button"
        className="btn friends__menu-btn"
        onClick={() => setView('send')}
      >
        <TbSend className="friends__menu--send" />
      </button>
    </div>
  )
}
export default FriendMenu
