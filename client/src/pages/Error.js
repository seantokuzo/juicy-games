import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error page">
      <h1 className="title">Page Not Found</h1>
      <h3 className="subtitle">how'd you get over here?</h3>
      <Link to="/" className="btn form-btn">
        <h3>Back</h3>
      </Link>
    </div>
  )
}

export default Error
