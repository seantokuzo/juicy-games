import React from 'react'
import { Link } from 'react-router-dom'

const MenuLink = () => {
  return (
    <div className="links-div">
      <Link to="/me" className="btn form-btn">
        <h3>Main Menu</h3>
      </Link>
    </div>
  )
}

export default MenuLink
