import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormRow } from '../components/index.js'
// import { useAppContext } from '../context/appContext'

const initialState = {
  username: '',
  email: '',
  password: '',
  loginNotSignup: true
}

const Home = () => {
  const [values, setValues] = useState(initialState)

  const toggleForm = () => {
    setValues({ ...values, loginNotSignup: !values.loginNotSignup })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()

    const { username, email, password, loginNotSignup } = values

    if (loginNotSignup && (!email || !password)) {
      console.log('💥 Login Error: Missing Field(s)')
    }
    if (!loginNotSignup && (!username || !email || !password)) {
      console.log('💥 Signup Error: Missing Field(s)')
    }

    console.log('submit form')
  }

  return (
    <section className="home page">
      <h1 className="home__title page__title">Trivial Trivia</h1>
      <form className="home__login-form" onSubmit={submitForm}>
        {!values.loginNotSignup && (
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn home__btn home__btn-login home__btn-btn"
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
        >
          <h3 className="home__link home__link--signup">
            {values.loginNotSignup ? 'Create an Account' : 'Login to Account'}
          </h3>
        </button>
        <Link to="/game" className="btn home__btn">
          <h3 className="home__link home__link--guest">Play as Guest</h3>
        </Link>
      </div>
    </section>
  )
}

export default Home
