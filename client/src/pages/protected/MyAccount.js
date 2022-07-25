import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'

const MyAccount = () => {
  const {
    user,
    displayAlert,
    showAlert,
    isLoading,
    updateUser,
    updatePassword,
    deleteAccount
  } = useAppContext()

  // console.log(user)

  const [editUserNotPass, setEditUserNotPass] = useState(true)

  const [username, setUsername] = useState(user?.username)
  const [email, setEmail] = useState(user?.email)

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(username, email)

    // IF EDITING USER DETAILS
    if (editUserNotPass) {
      // CHECK IF ANYHTING CHANGED
      if (user.email === email && user.username === username) {
        displayAlert(
          'success',
          'Updated to the same exact thing! Congrats on wasting our time',
          5000
        )
        return
      }
      // IF THERE ARE UPDATES FIRE OFF THE AXIOS
      updateUser({ username, email })
      return
    }

    // IF EDITING PASSWORD
    if (!editUserNotPass) {
      if (newPassword !== newPasswordConfirm) {
        displayAlert('danger', "Them passwords don't match fam")
        return
      }
      updatePassword(password, newPassword)
    }
  }

  return (
    <div className="account">
      <div className="account__user">
        <div className="account__avatars"></div>
        <div className="account__form">
          {showAlert && <Alert />}
          <form className="form" onSubmit={handleSubmit}>
            {editUserNotPass ? (
              <>
                <FormRow
                  type="text"
                  name="username"
                  value={username}
                  handleChange={(e) => setUsername(e.target.value)}
                  labelText={'change username'}
                />
                <FormRow
                  type="email"
                  name="email"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                  labelText={'update email'}
                  explanation="(requires confirmation)"
                />
              </>
            ) : (
              <>
                <FormRow
                  type="password"
                  name="password"
                  value={password}
                  handleChange={(e) => setPassword(e.target.value)}
                  labelText={'current password'}
                />
                <FormRow
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  handleChange={(e) => setNewPassword(e.target.value)}
                  labelText={'new password'}
                />
                <FormRow
                  type="password"
                  name="newPasswordConfirm"
                  value={newPasswordConfirm}
                  handleChange={(e) => setNewPasswordConfirm(e.target.value)}
                  labelText={'confirm new password'}
                />
              </>
            )}
            <button
              type="submit"
              className="btn btn-theme account__form-btn account__form-btn--submit"
              disabled={isLoading || showAlert}
              style={{ backgroundColor: !editUserNotPass ? 'red' : '' }}
            >
              {editUserNotPass ? 'Update Me' : 'Update Password'}
            </button>
            <div className="account__form-line"></div>
            <button
              type="button"
              className="btn btn-theme account__form-btn"
              style={{ backgroundColor: editUserNotPass ? 'red' : '' }}
              onClick={() => setEditUserNotPass(!editUserNotPass)}
              disabled={isLoading || showAlert}
            >
              {editUserNotPass ? 'Danger Zone' : 'Edit Account'}
            </button>
          </form>
        </div>
      </div>
      {editUserNotPass && (
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
      )}
    </div>
  )
}

export default MyAccount

{
  /* <div className="account__password">
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
      </div> */
}
