import React from 'react'
import { useAppContext } from '../../context/appContext'

const PracticeReady = () => {
  const { startPractice, resetPracticeOptions } = useAppContext()
  return (
    <div className="practice-ready">
      <h1 className="title practice-ready__title">Game Ready</h1>
      <h3 className="subtitle practice-ready__subtitle">Butt are you?</h3>
      <div className="btn practice-ready__btn" onClick={startPractice}>
        <p className="text btn-text practice-ready__btn-text">Start Game</p>
      </div>
      <div className="btn practice-ready__btn" onClick={resetPracticeOptions}>
        <p className="text btn-text practice-ready__btn-text">Game Options</p>
      </div>
    </div>
  )
}

export default PracticeReady
