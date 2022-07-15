import React from 'react'
import { Link } from 'react-router-dom'
// import { useAppContext } from '../context/appContext'

const Welcome = () => {

  return (
    <section className="welcome page">
      <h1 className="welcome__title page__title">Trivial Trivia</h1>
      <div className="welcome__links-div">
        {/* <Link to="/signup">
          <h3 className="welcome__link welcome__link--signup">
            Create an Account
          </h3>
        </Link> */}
        <Link to="/game" className="btn welcome__btn">
          <h3 className="welcome__link welcome__link--guest">Play as Guest</h3>
        </Link>
      </div>
    </section>
  )
}

export default Welcome
