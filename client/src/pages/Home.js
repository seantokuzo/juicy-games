import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, FormRow } from '../components/index.js'
import { useAppContext } from '../context/appContext.js'
// import { useAppContext } from '../context/appContext'

const initialState = {
  username: '',
  email: '',
  password: '',
  loginNotSignup: true
}

const Home = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, missingFieldsAlert, setupUser } =
    useAppContext()

  console.log(user)

  const toggleForm = () => {
    setValues({ ...values, loginNotSignup: !values.loginNotSignup })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()

    console.log('submit form')

    const { username, email, password, loginNotSignup } = values
    let formUser = { email, password }

    // IF LOGGING IN
    if (loginNotSignup) {
      // CHECK FOR ALL FIELDS
      if (!email || !password) {
        missingFieldsAlert()
        return
      }
      return setupUser(
        formUser,
        'login',
        "Login Successful. Let's see how them brains doing today"
      )
    }

    // IF SIGNING UP NEW ACCOUNT
    if (!loginNotSignup) {
      // CHECK FOR ALL FIELDS
      if (!username || !email || !password) {
        missingFieldsAlert()
        return
      }
      formUser = { ...formUser, username }
      return setupUser(
        formUser,
        'signup',
        'Sign up successful. Welcome to your worst nightmare'
      )
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <section className="home page">
      <h1 className="home__title title">Trivial Trivia</h1>
      <form className="home__login-form" onSubmit={submitForm}>
        <h3 className="home__form-title text">
          {values.loginNotSignup ? 'Login to Play' : 'Create an Account'}
        </h3>
        {showAlert && <Alert />}
        {!values.loginNotSignup && (
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn home__btn home__btn-login home__btn-btn"
          disabled={isLoading}
        >
          {values.loginNotSignup ? 'Login' : 'Signup'}
        </button>
      </form>
      <div className="home__links-div">
        <h3 className="text" style={{ textDecoration: 'underline' }}>
          OR
        </h3>
        <button
          type="button"
          className="btn home__btn home__btn-btn"
          onClick={toggleForm}
          disabled={isLoading}
        >
          <h3 className="home__link home__link--signup">
            {values.loginNotSignup ? 'Create an Account' : 'Login to Account'}
          </h3>
        </button>
        <Link
          to="/practice"
          className="btn home__btn"
          style={{ pointerEvents: isLoading ? 'none' : '' }}
        >
          <h3 className="home__link home__link--guest">Play as Guest</h3>
        </Link>
      </div>
    </section>
  )
}

export default Home
