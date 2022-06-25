import React from 'react'
import { useAppContext } from '../../context/appContext'

const GameReady = () => {
  const { startGame, trivia } = useAppContext()
  console.log(trivia)
  return (
    <div className="card card__game-ready">
      <h1 className="card-title">Game Ready</h1>
      <h3 className="card-subtitle">Butt are you?</h3>
      <button className="btn btn__start-game" onClick={startGame}>
        Start Game
      </button>
    </div>
  )
}

export default GameReady
