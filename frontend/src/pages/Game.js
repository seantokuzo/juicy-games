import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import GameOptions from '../components/GameOptions'
import Alert from '../components/Alert'

const Game = () => {
  const {
    optionComboError,
    showAlert,
    showOptions,
    loadingQuestions,
    setTrivia,
    trivia,
    gameActive,
    gameOptions
  } = useAppContext()

  console.log(trivia)

  useEffect(() => {
    if (loadingQuestions) {
      const startTime = Date.now()
      console.log(startTime)
      fetch(
        `https://opentdb.com/api.php?amount=${gameOptions.amount}&category=${gameOptions.category}&difficulty=${gameOptions.difficulty}&type=${gameOptions.type}`
      )
        .then((res) => res.json())
        .then((data) => {
          // DISPLAY ALERT IF NOT ENOUGH QUESTIONS RETRIEVED
          if (data.results < gameOptions.amount) {
            optionComboError()
            return
          }
          // LOADING SCREEN FOR AT LEAST 1 SECOND
          const time = 1000 - (Date.now() - startTime)
          if (time > 0) {
            setTimeout(() => {
              setTrivia(data.results)
            }, time)
            return
          }
          setTrivia(data.results)
        })
        .catch((err) => console.log(err))
    }
  }, [loadingQuestions])

  return (
    <div className="game page">
      {showAlert && <Alert />}
      {showOptions && !gameActive && <GameOptions />}
      {gameActive && <h1>Game</h1>}
      {loadingQuestions && <h1>Loading Questions...</h1>}
    </div>
  )
}

export default Game
