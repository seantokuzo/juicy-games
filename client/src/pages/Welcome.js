import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormRow } from '../components/index.js'
// import { useAppContext } from '../context/appContext'

const initialState = {
  email: '',
  password: ''
}

const Welcome = () => {
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()

    console.log('submit form')
  }

  return (
    <section className="welcome page">
      <h1 className="welcome__title page__title">Trivial Trivia</h1>
      <div className="welcome__links-div">
        <form className="welcome__login-form" onSubmit={submitForm}>
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
          <button type="submit" className="btn welcome__btn welcome__btn-login">
            Login
          </button>
        </form>
        <Link to="/signup" className="btn welcome__btn">
          <h3 className="welcome__link welcome__link--signup">
            Create an Account
          </h3>
        </Link>
        <Link to="/game" className="btn welcome__btn">
          <h3 className="welcome__link welcome__link--guest">Play as Guest</h3>
        </Link>
      </div>
    </section>
  )
}

export default Welcome
