import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const MenuLink = () => {
  const { isLoading, showAlert } = useAppContext()

  return (
    <div className="links-div">
      <Link
        to="/me"
        className="btn form-btn"
        style={{ pointerEvents: isLoading || showAlert ? 'none' : '' }}
      >
        <h3>Main Menu</h3>
      </Link>
    </div>
  )
}

export default MenuLink
