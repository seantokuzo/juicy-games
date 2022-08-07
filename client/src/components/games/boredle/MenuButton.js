import React from 'react'
import { useAppContext } from '../../../context/appContext'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'

const MenuButton = () => {
  const { isLoading, showAlert } = useAppContext()
  const { updateMode } = useBoredleContext()

  return (
    <div className="links-div">
      <button
        to="/me/games/boredle"
        className="btn form-btn"
        onClick={() => updateMode('menu')}
        disabled={isLoading || showAlert}
      >
        <h3>Boredle Menu</h3>
      </button>
    </div>
  )
}
export default MenuButton
