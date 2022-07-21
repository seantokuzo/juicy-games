import React from 'react'
import { useAppContext } from '../context/appContext'

const GameReady = () => {
  const { startGame, resetOptions } = useAppContext()
  return (
    <div className="game-ready">
      <h1 className="title game-ready__title">Game Ready</h1>
      <h3 className="subtitle game-ready__subtitle">Butt are you?</h3>
      <div className="btn game-ready__btn" onClick={startGame}>
        <p className="text btn-text game-ready__btn-text">Start Game</p>
      </div>
      <div className="btn game-ready__btn" onClick={resetOptions}>
        <p className="text btn-text game-ready__btn-text">Game Options</p>
      </div>
    </div>
  )
}

export default GameReady
