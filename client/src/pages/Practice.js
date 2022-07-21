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
    retrievePracticeCategories,
    updatePracticeOptions,
    optionComboError,
    setTrivia,
    practiceState
  } = useAppContext()
  const {
    practiceReady,
    practiceActive,
    practiceOver,
    practiceOptions,
    showPracticeOptions,
    loadingPractice
  } = practiceState

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        retrievePracticeCategories(
          data.trivia_categories.slice(0, data.trivia_categories.length - 3)
        )
        console.log('retrieved')
        updatePracticeOptions({
          target: { name: 'category', value: data.trivia_categories[0].id }
        })
        console.log('updated')
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (loadingPractice) {
      const startTime = Date.now()
      fetch(
        `https://opentdb.com/api.php?amount=${practiceOptions.amount}&category=${practiceOptions.category}&difficulty=${practiceOptions.difficulty}&type=${practiceOptions.type}&encode=url3986`
      )
        .then((res) => res.json())
        .then((data) => {
          // DISPLAY ALERT IF NOT ENOUGH QUESTIONS RETRIEVED
          if (data.results < practiceOptions.amount) {
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
  }, [loadingPractice])

  return (
    <div className="game">
      {showPracticeOptions && <PracticeOptions />}
      {practiceReady && <GameReady />}
      {practiceActive && <TriviaCarousel />}
      {practiceOver && <PracticeResults />}
      {loadingPractice && <h1 className="center">Loading...</h1>}
    </div>
  )
}

export default Practice
