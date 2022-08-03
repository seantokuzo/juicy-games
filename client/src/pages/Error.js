import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="page">
      <div className="error">
        <h1 className="error__title title">Page Not Found</h1>
        <h3 className="error__subtitle subtitle">How'd you get over here?</h3>
        <Link to="/" className="btn btn-theme form-btn error__btn">
          <h3>Back</h3>
        </Link>
      </div>
    </section>
  )
}

export default Error
