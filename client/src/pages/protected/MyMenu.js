import React from 'react'
import { AccountLinks } from '../../components'
import { useAppContext } from '../../context/appContext'

const MyMenu = () => {
  const { user, changeTheme, getMyFriends } = useAppContext()

  // useEffect(() => {
  //   if (user.avatar && user.avatar !== 'default') {
  //     changeTheme(user.avatar)
  //   }
  // }, [])

  return (
    <div className="menu page">
      <div className="form">
        <h1 className="title">Main Menu</h1>
        <AccountLinks />
      </div>
    </div>
  )
}

export default MyMenu
