import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Alert, FormRow } from '../components'
import { useAppContext } from '../context/appContext'

const initialState = {
  password: '',
  passwordConfirm: ''
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)

  const { token } = useParams()
  const { user, isLoading, showAlert, displayAlert, resetPassword } =
    useAppContext()

  console.log(user)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()
    const { password, passwordConfirm } = values
    // IF NO EMAIL THROW ERROR
    if (!password || !passwordConfirm) {
      displayAlert('danger', '...at least type something, anything')
      return
    }
    if (password !== passwordConfirm) {
      displayAlert(
        'danger',
        "Passwords don't match. Do you have fat fingers like me?"
      )
      return
    }
    // SEND REQUEST & RESET EMAIL
    resetPassword(token, password)
    setValues(initialState)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/game')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <div className="forgot page">
      <form className="form" onSubmit={submitForm}>
        <h1 className="form-title">Reset Your Password</h1>
        {showAlert && <Alert />}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText={'new password'}
        />
        <FormRow
          type="password"
          name="passwordConfirm"
          value={values.passwordConfirm}
          handleChange={handleChange}
          labelText={'confirm new password'}
        />
        <button
          type="submit"
          className="btn btn-theme form-btn forgot__btn"
          disabled={isLoading || showAlert}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
