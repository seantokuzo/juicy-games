import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormRow } from '../components/index.js'
// import { useAppContext } from '../context/appContext'

const initialState = {
  email: '',
  password: '',
  loginNotSignup: true
}

const Home = () => {
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()

    console.log('submit form')
  }

  return (
    <section className="home page">
      <h1 className="home__title page__title">Trivial Trivia</h1>
      <form className="home__login-form" onSubmit={submitForm}>
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
        <button type="submit" className="btn home__btn home__btn-login">
          {values.loginNotSignup ? 'Login' : 'Signup'}
        </button>
      </form>
      <div className="home__links-div">
        <h3 className="text" style={{ textDecoration: 'underline' }}>
          OR
        </h3>
        <button type="button" className="btn home__btn">
          <h3 className="home__link home__link--signup">Create an Account</h3>
        </button>
        <Link to="/game" className="btn home__btn">
          <h3 className="home__link home__link--guest">Play as Guest</h3>
        </Link>
      </div>
    </section>
  )
}

export default Home
