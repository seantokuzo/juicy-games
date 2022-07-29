import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, FormRow } from '../components/index.js'
import { useAppContext } from '../context/appContext.js'

const initialState = {
  email: '',
  username: '',
  password: ''
}

const Home = () => {
  const navigate = useNavigate()
  const [loginWithEmail, setLoginWithEmail] = useState(false)
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, missingFieldsAlert, loginUser } =
    useAppContext()
  console.log(user);

  const toggleForm = () => {
    if (loginWithEmail) {
      setValues({ ...initialState, password: values.password })
    }
    setLoginWithEmail(!loginWithEmail)
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()
    const { email, username, password } = values
    // CHECK FOR ALL FIELDS
    if ((!email && !username) || !password) {
      missingFieldsAlert()
      return
    }
    loginUser(
      { email, username, password },
      'Login success. Welcome to your worst nightmare'
    )
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/game')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <section className="home page">
      <h1 className="home__title title">Trivial Trivia</h1>
      <form className="form home__form" onSubmit={submitForm}>
        <h3 className="form-title subtitle">Login to Play</h3>
        {showAlert && <Alert />}
        {loginWithEmail ? (
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
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-theme form-btn"
          disabled={isLoading || showAlert}
        >
          <h3 className="home__link home__link--signup">Login</h3>
        </button>
        <p className="text-mini" onClick={toggleForm}>
          {`Login with your ${loginWithEmail ? 'username' : 'email'} instead`}
        </p>
        <Link to="/forgotPassword" className="text-mini">
          Forgot password?
        </Link>
      </form>
      {!user && (
        <div className="links-div">
          <h3 className="text" style={{ textDecoration: 'underline' }}>
            OR
          </h3>
          <Link
            to="/signup"
            className="btn link"
            style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
          >
            <h3>Create an Account</h3>
          </Link>
          <Link
            to="/practice"
            className="btn link"
            style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
          >
            <h3>Practice</h3>
          </Link>
        </div>
      )}
    </section>
  )
}

export default Home
