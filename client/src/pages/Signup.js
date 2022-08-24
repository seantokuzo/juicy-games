import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, FormRow } from '../components/index.js'
import { useAppContext } from '../context/appContext.js'

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

const Signup = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const {
    user,
    isLoading,
    displayAlert,
    showAlert,
    missingFieldsAlert,
    signupNewUser
  } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { username, email, password, passwordConfirm } = values

    // CHECK FOR ALL FIELDS
    if (!username || !email || !password || !passwordConfirm) {
      missingFieldsAlert()
      return
    }
    // CHECK PASSWORDS MATCH
    if (password !== passwordConfirm) {
      displayAlert('danger', "Let's try to make those passwords match")
      return
    }
    const response = await signupNewUser({
      username,
      email,
      password,
      passwordConfirm
    })

    if (response.status === 'success') {
      setSignupSuccess(true)
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/me')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <section className="signup page">
      <form className="form" onSubmit={submitForm}>
        {!signupSuccess && (
          <h3 className="form-title subtitle">Create an Account</h3>
        )}
        {showAlert && <Alert />}
        {signupSuccess && (
          <div className={`alert alert-success`}>
            We sent you a confirmation email. If that was your real email
            address now's the time to prove it
          </div>
        )}
        {!signupSuccess && (
          <>
            <FormRow
              type="text"
              name="username"
              value={values.username}
              handleChange={handleChange}
              first={true}
            />
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
              first={values.loginNotSignup}
            />
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
            <FormRow
              type="password"
              name="passwordConfirm"
              value={values.passwordConfirm}
              handleChange={handleChange}
              labelText="password confirm"
            />
            <button
              type="submit"
              className="btn btn-theme form-btn signup__btn"
              disabled={isLoading || showAlert}
            >
              {values.loginNotSignup ? 'Login' : 'Signup'}
            </button>
          </>
        )}
        {signupSuccess && (
          <Link to="/" className="btn form-btn">
            <h3>Back to Login</h3>
          </Link>
        )}
      </form>
      {!signupSuccess && (
        <div className="links-div signup__links-div">
          <h3 className="text" style={{ textDecoration: 'underline' }}>
            OR
          </h3>
          <Link
            to="/"
            className="btn link signup__link"
            style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
          >
            <h3>Login to Account</h3>
          </Link>
        </div>
      )}
    </section>
  )
}

export default Signup
