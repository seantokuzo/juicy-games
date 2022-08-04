import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import FormRow from '../FormRow'

const FriendRequestForm = () => {
  const [email, setEmail] = useState('')
  const { requestFriend, isLoading, showAlert, displayAlert } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      displayAlert('danger', 'Give us an email')
    }
    requestFriend(email)
    setEmail('')
  }

  return (
    <form className="friends__request-form" onSubmit={handleSubmit}>
      <FormRow
        first={true}
        type="email"
        name="email"
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
        labelText="Friend's Email"
      />
      <button
        type="submit"
        className="btn btn-theme form-btn"
        disabled={isLoading || showAlert}
      >
        Send Request
      </button>
    </form>
  )
}

export default FriendRequestForm
