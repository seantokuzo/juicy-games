import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'

const MyTrivia = () => {
  const { user, changeTheme } = useAppContext()

  useEffect(() => {
    if (user.avatar && user.avatar !== 'default') {
      changeTheme(user.avatar)
    }
  }, [])

  return (
    <div
      className="trivia-options"
      style={{ backgroundColor: 'black', padding: '2rem' }}
    >
      <h1 className="theme-color">My Trivia</h1>
    </div>
  )
}

export default MyTrivia
