import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormRow } from '../../components'
import { useAppContext } from '../../context/appContext'

const MyAccount = () => {
  const { user } = useAppContext()

  const [username, setUsername] = useState(user?.username)
  const [email, setEmail] = useState(user?.email)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <div className="account">
      <div className="account__user">
        <div className="account__user-avatars"></div>
        <div className="account__user-details">
          <form
            className="form account__user-details__form"
            onSubmit={handleSubmit}
          >
            <FormRow
              type="text"
              name="username"
              value={username}
              handleChange={(e) => setUsername(e.target.value)}
            />
            <FormRow
              type="email"
              name="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <Link to="/game/danger-zone" className="btn btn-theme account__user-details__form-btn">
              <h3 className="account__links-link-text text">Update Password</h3>
            </Link>
          </form>
        </div>
      </div>
      <div className="account__links">
        <Link to="/game" className="btn account__links-link">
          <h3 className="account__links-link-text subtitle">My Trivia</h3>
        </Link>
        <Link to="/game/my-stats" className="btn account__links-link">
          <h3 className="account__links-link-text subtitle">My Stats</h3>
        </Link>
        <Link to="/game/leaderboard" className="btn account__links-link">
          <h3 className="account__links-link-text subtitle">Leaderboard</h3>
        </Link>
      </div>
    </div>
  )
}

export default MyAccount

{/* <div className="account__password">
        <form
          className="form account__password-form"
          onSubmit={handlePasswordChange}
        >
          <FormRow
            type="password"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormRow
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            handleChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </form>
      </div> */}