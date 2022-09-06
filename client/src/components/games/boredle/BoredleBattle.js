import React from 'react'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'

const BoredleBattle = () => {
  const { updateBoredleMode } = useBoredleContext()

  return (
    <div className="boredle__battle page">
      <h1 className="title">Boredle Battle</h1>
      <button
        type="button"
        className="btn"
        onClick={() => updateBoredleMode('menu')}
      >
        Menu
      </button>
    </div>
  )
}

export default BoredleBattle
