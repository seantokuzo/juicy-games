import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, ButtonLink, FormRow } from '../components/index.js'
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

  // *** EDIT THIS ***
  // CHANGE TO CHECK FOR TOKEN - SEND TO ROUTE THAT CHECKS THE TOKEN
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/me')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <section className="home page">
      <h1 className="home__title title">Juicy Games</h1>
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
        <p className="text-mini text-mini-click" onClick={toggleForm}>
          {`Login with your ${loginWithEmail ? 'username' : 'email'} instead`}
        </p>
        <Link to="/forgotPassword" className="text-mini text-mini-click">
          Forgot password?
        </Link>
        <p
          className="home__demo-btn form-btn"
          onClick={() =>
            loginUser(
              {
                email: 'juicyTester@test.com',
                username: 'Juicy Tester',
                password: 'test1234'
              },
              'Login successful! Enjoy the demo'
            )
          }
        >
          Demo the App
        </p>
      </form>
      {!user && (
        <div className="home__links-div">
          <h3 className="text" style={{ textDecoration: 'underline' }}>
            OR
          </h3>
          <ButtonLink path="/signup" btnClass="link" text="Create an Account" />
          {/* <ButtonLink path="/practice" btnClass="link" text="Practice" /> */}
        </div>
      )}
    </section>
  )
}

export default Home
