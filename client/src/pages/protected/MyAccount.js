import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FormRow, Alert } from '../../components'
import AvatarMenu from '../../components/AvatarMenu'
import { useAppContext } from '../../context/appContext'

const MyAccount = () => {
  const {
    user,
    displayAlert,
    showAlert,
    isLoading,
    updateUser,
    updatePassword,
    deleteMe
  } = useAppContext()

  const [editUserNotPass, setEditUserNotPass] = useState(true)
  const [deleteMeWarning, setDeleteMeWarning] = useState(false)

  const [username, setUsername] = useState(user?.username)
  const [email, setEmail] = useState(user?.email)

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

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
      const emailUpdated = user.email !== email
      // IF THERE ARE UPDATES FIRE OFF THE AXIOS
      updateUser({ username, email, emailUpdated })
      if (user.username !== username) setUsername(username)
      if (emailUpdated) setEmail(user.email)
      return
    }

    // IF EDITING PASSWORD
    if (!editUserNotPass) {
      if (newPassword !== newPasswordConfirm) {
        displayAlert('danger', "Them passwords don't match fam")
        return
      }
      updatePassword(password, newPassword)
      setPassword('')
      setNewPassword('')
      setNewPasswordConfirm('')
    }
  }

  return (
    <div className="account page">
      {deleteMeWarning && (
        <div className="modal" onClick={() => setDeleteMeWarning(false)}>
          <div className="modal-inner modal-danger" onClick={() => {}}>
            <AiFillCloseCircle
              className="modal__close"
              onClick={() => setDeleteMeWarning(false)}
            />
            <h3 className="modal__title title">Are You Sure Sure?</h3>
            <button
              type="button"
              className="modal__btn modal__btn-danger"
              disabled={isLoading || showAlert}
              onClick={deleteMe}
            >
              DELETE ME
            </button>
          </div>
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        {showAlert && <Alert />}
        {editUserNotPass ? (
          <>
            <FormRow
              type="text"
              name="username"
              value={username}
              handleChange={(e) => setUsername(e.target.value)}
              labelText={'change username'}
              first={true}
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
              first={true}
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
          className="btn btn-theme form-btn"
          disabled={isLoading || showAlert || deleteMeWarning}
          style={{ backgroundColor: !editUserNotPass ? 'red' : '' }}
        >
          {editUserNotPass ? 'Update Me' : 'Update Password'}
        </button>
        <div className="account__form-line"></div>
        <button
          type="button"
          className="btn btn-theme form-btn"
          style={{ backgroundColor: editUserNotPass ? 'red' : '' }}
          onClick={() => setEditUserNotPass(!editUserNotPass)}
          disabled={isLoading || showAlert || deleteMeWarning}
        >
          {editUserNotPass ? 'Danger Zone' : 'Edit Account'}
        </button>
        {editUserNotPass && <AvatarMenu />}
        {!editUserNotPass && (
          <>
            <h3
              className="text account__text-bye"
              style={{ textDecoration: 'underline' }}
            >
              Or go bye bye?
            </h3>
            <button
              type="button"
              className="btn btn-theme form-btn"
              style={{ backgroundColor: 'red' }}
              onClick={() => setDeleteMeWarning(true)}
              disabled={isLoading || showAlert || deleteMeWarning}
            >
              Delete Account
            </button>
          </>
        )}
      </form>
      {editUserNotPass && (
        <Link
          to="/game"
          className="btn link account__links-link"
          style={{
            pointerEvents:
              isLoading || showAlert || deleteMeWarning ? 'none' : ''
          }}
        >
          <h3>My Trivia</h3>
        </Link>
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
