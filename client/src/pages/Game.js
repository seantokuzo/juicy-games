import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import {
  GameOptions,
  GameReady,
  TriviaCarousel,
  GameResults,
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
    gameOptions,
    gameOver
  } = useAppContext()

  localStorage.clear()

  useEffect(() => {
    if (loadingQuestions) {
      const startTime = Date.now()
      // console.log(startTime)
      fetch(
        `https://opentdb.com/api.php?amount=${gameOptions.amount}&category=${gameOptions.category}&difficulty=${gameOptions.difficulty}&type=${gameOptions.type}&encode=url3986`
      )
        .then((res) => res.json())
        .then((data) => {
          // DISPLAY ALERT IF NOT ENOUGH QUESTIONS RETRIEVED
          if (data.results < gameOptions.amount) {
            optionComboError()
            return
          }
          const trivia = data.results.map((obj, i) => ({
            id: i + 1,
            question: decodeURIComponent(obj.question),
            correctAnswer: decodeURIComponent(obj.correct_answer),
            possibleAnswers: [...obj.incorrect_answers, obj.correct_answer]
              .map((string) => decodeURIComponent(string))
              .sort(() => (Math.random() > 0.5 ? 1 : -1)),
            selectedAnswer: ''
          }))

          // SAVE TRIVIA IN LOCAL STORAGE
          // localStorage.setItem('localTrivia', JSON.stringify(trivia))

          // LOADING SCREEN FOR AT LEAST 1 SECOND
          const time = 2000 - (Date.now() - startTime)
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
      {gameOver && <GameResults />}
      {loadingQuestions && <h1 className="center">Loading...</h1>}
    </div>
  )
}

export default Game
