import React from 'react'
import { useAppContext } from '../../context/appContext'

const GameReady = () => {
  const { startGame, trivia } = useAppContext()
  console.log(trivia)
  return (
    <div className="game-ready">
      <h1 className="title game-ready__title">Game Ready</h1>
      <h3 className="subtitle game-ready__subtitle">Butt are you?</h3>
      <div className="btn game-ready__btn" onClick={startGame}>
        <p className="text btn-text game-ready__btn-text">Start Game</p>
      </div>
    </div>
  )
}

export default GameReady