import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, FormRow } from '../components'
import { useAppContext } from '../context/appContext'

const initialState = {
  email: '',
  username: ''
}

const ForgotPassword = () => {
  const [values, setValues] = useState(initialState)
  const [resetWithEmail, setResetWithEmail] = useState(true)
  console.log(values)

  const { isLoading, showAlert, displayAlert, requestPasswordReset } =
    useAppContext()

  const toggleForm = () => {
    setValues(initialState)
    setResetWithEmail(!resetWithEmail)
  }

  const handleChange = (e) => {
    setValues({ ...initialState, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()
    const { email, username } = values

    if (!email && !username) {
      displayAlert('danger', "We can't help you without yer info")
    }

    if (email && username) {
      displayAlert('danger', 'Something went wrong, please try again')
      setValues(initialState)
    }
    const user = {
      email: email ? email : undefined,
      username: username ? username : undefined
    }
    requestPasswordReset({ ...user })
    setValues(initialState)
  }

  console.log(resetWithEmail)

  return (
    <div className="forgot page">
      <form className="form" onSubmit={submitForm}>
        <h1 className="form-title">Forgot Password</h1>
        {showAlert && <Alert />}
        {resetWithEmail ? (
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            first={true}
          />
        ) : (
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
            first={true}
          />
        )}
        <button
          type="submit"
          className="btn btn-theme form-btn signup__btn"
          disabled={isLoading || showAlert}
        >
          Send Reset Link
        </button>
        <p className="text-mini forgot__form-switch" onClick={toggleForm}>
          {`Use your ${resetWithEmail ? 'username' : 'email'} instead`}
        </p>
      </form>
      <div className="links-div">
        <Link
          to="/"
          className="btn link"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Back to Login</h3>
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
