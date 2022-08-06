import React from 'react'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'

const BoredleMenu = () => {
  const { tempAction } = useBoredleContext()

  return (
    <div className="boredle__menu form">
      <button className="btn btn-theme form-btn" onClick={tempAction}>
        Action Jackson
      </button>
    </div>
  )
}

export default BoredleMenu
