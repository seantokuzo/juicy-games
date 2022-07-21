import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import {
  PracticeOptions,
  GameReady,
  TriviaCarousel,
  PracticeResults
} from '../components/index.js'

const Practice = () => {
  const {
    retrieveCategories,
    updateGameOptions,
    optionComboError,
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
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        retrieveCategories(
          data.trivia_categories.slice(0, data.trivia_categories.length - 3)
        )
        updateGameOptions({
          target: { name: 'category', value: data.trivia_categories[0].id }
        })
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (loadingQuestions) {
      const startTime = Date.now()
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
      {showOptions && <PracticeOptions />}
      {gameReady && <GameReady />}
      {gameActive && <TriviaCarousel />}
      {gameOver && <PracticeResults />}
      {loadingQuestions && <h1 className="center">Loading...</h1>}
    </div>
  )
}

export default Practice
