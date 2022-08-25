import React from 'react'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'

const NewGameBtn = () => {
  const { newPracticeGame } = useBoredleContext()

  return (
    <button
      type="button"
      className="btn form-btn boredle__practice-new-game-btn"
      onClick={newPracticeGame}
    >
      <h3>NEW GAME</h3>
    </button>
  )
}

export default NewGameBtn
