import React, { useEffect } from 'react'
import { AccountLinks } from '../../components'
import { useAppContext } from '../../context/appContext'

const MyMenu = () => {
  const { user, changeTheme } = useAppContext()

  useEffect(() => {
    if (user.avatar && user.avatar !== 'default') {
      changeTheme(user.avatar)
    }
  }, [])

  return (
    <div className="trivia-options page">
      <AccountLinks />
    </div>
  )
}

export default MyMenu
