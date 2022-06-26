import React, { useState, useEffect } from 'react'
import { decode } from 'html-entities'
import { useAppContext } from '../context/appContext'
import {
  GameOptions,
  GameReady,
  TriviaCarousel,
  Alert
} from '../components/index.js'

const Game = () => {
  const {
    optionComboError,
    showAlert,
    showOptions,
    loadingQuestions,
    setTrivia,
    gameReady,
    gameActive,
    gameOptions
  } = useAppContext()

  // console.log(trivia)

  useEffect(() => {
    if (loadingQuestions) {
      const startTime = Date.now()
      // console.log(startTime)
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
          const trivia = data.results.map((obj) => ({
            question: decode(obj.question),
            correctAnswer: decode(obj.correct_answer),
            possibleAnswers: [...obj.incorrect_answers, obj.correct_answer]
              .map((string) => decode(string))
              .sort(() => (Math.random() > 0.5 ? 1 : -1)),
            selectedAnswer: ''
          }))
          localStorage.setItem('localTrivia', JSON.stringify(trivia))
          // LOADING SCREEN FOR AT LEAST 1 SECOND
          const time = 1000 - (Date.now() - startTime)
          if (time > 0) {
            setTimeout(() => {
              setTrivia(trivia)
            }, time)
            return
          }
          setTrivia(trivia)
        })
        .catch((err) => console.log(err))
    }
  }, [loadingQuestions])

  return (
    <div className="game">
      {showAlert && <Alert />}
      {showOptions && <GameOptions />}
      {gameReady && <GameReady />}
      {gameActive && <TriviaCarousel />}
      {loadingQuestions && <h1>Loading Questions...</h1>}
    </div>
  )
}

export default Game