import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, FormRow } from '../components'
import { useAppContext } from '../context/appContext'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const { isLoading, showAlert, displayAlert, requestPasswordReset } =
    useAppContext()

  const submitForm = (e) => {
    e.preventDefault()
    // IF NO EMAIL THROW ERROR
    if (!email) {
      displayAlert('danger', "We can't help you without yer info")
    }
    // SEND REQUEST & RESET EMAIL
    requestPasswordReset({ email })
    setEmail('')
  }

  return (
    <div className="forgot page">
      <form className="form" onSubmit={submitForm}>
        <h1 className="form-title">Forgot Password</h1>
        {showAlert && <Alert />}
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          first={true}
        />

        <button
          type="submit"
          className="btn btn-theme form-btn forgot__btn"
          disabled={isLoading || showAlert}
        >
          Send Reset Link
        </button>
      </form>
      <div className="links-div">
        <Link
          to="/"
          className="btn link form-btn"
          style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
        >
          <h3>Back to Login</h3>
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword
