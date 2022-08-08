import React from 'react'
import { BoredleHeader, GuessGrid, Keyboard } from './components'

const BoredleGame = () => {
  return (
    <div className="boredle__game">
      <BoredleHeader />
      <GuessGrid />
      <Keyboard />
    </div>
  )
}

export default BoredleGame
