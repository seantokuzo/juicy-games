import React from 'react'
import { useAppContext } from '../../../context/appContext'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'

const MenuButton = () => {
  const { isLoading, showAlert } = useAppContext()
  const { updateBoredleMode } = useBoredleContext()

  return (
    <div className="links-div">
      <button
        type="button"
        className="btn boredle__btn fs-boredle"
        onClick={() => updateBoredleMode('menu')}
        disabled={isLoading || showAlert}
      >
        <h3>Boredle Menu</h3>
      </button>
    </div>
  )
}
export default MenuButton
