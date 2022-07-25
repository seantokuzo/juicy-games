import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, FormRow } from '../components/index.js'
import { useAppContext } from '../context/appContext.js'

const initialState = {
  email: '',
  password: ''
}

const Home = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, missingFieldsAlert, loginUser } =
    useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()
    const { email, password } = values
    // CHECK FOR ALL FIELDS
    if (!email || !password) {
      missingFieldsAlert()
      return
    }
    loginUser({ email, password })
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
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          first={true}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-theme form-btn"
          disabled={isLoading}
        >
          <h3 className="home__link home__link--signup">Login</h3>
        </button>
      </form>
      <div className="links-div">
        <h3 className="text" style={{ textDecoration: 'underline' }}>
          OR
        </h3>
        <Link
          to="/signup"
          className="btn link"
          style={{ pointerEvents: isLoading ? 'none' : '' }}
        >
          <h3>Create an Account</h3>
        </Link>
        <Link
          to="/practice"
          className="btn link"
          style={{ pointerEvents: isLoading ? 'none' : '' }}
        >
          <h3>Practice</h3>
        </Link>
      </div>
    </section>
  )
}

export default Home
