import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const ButtonLink = ({ path, btnClass, text, disabler = false }) => {
  const { isLoading, showAlert } = useAppContext()

  return (
    <div className="links-div">
      <Link
        to={path}
        className={`btn ${btnClass}`}
        style={{
          pointerEvents: isLoading || showAlert || disabler ? 'none' : ''
        }}
      >
        <h3>{text}</h3>
      </Link>
    </div>
  )
}

export default ButtonLink
