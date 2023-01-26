import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import {
  PracticeOptions,
  PracticeReady,
  TriviaCarousel,
  PracticeResults,
  Alert,
  Timer
} from '../components/index.js'

const TriviaPractice = () => {
  const {
    displayAlert,
    showAlert,
    retrievePracticeCategories,
    updatePracticeOptions,
    optionComboError,
    setPracticeTrivia,
    practiceState: {
      practiceCategories,
      practiceReady,
      practiceActive,
      practiceOver,
      practiceOptions,
      showPracticeOptions,
      loadingPractice
    }
  } = useAppContext()

  // LOAD CATEGORIES FROM API
  useEffect(() => {
    if (showPracticeOptions) {
      fetch('https://opentdb.com/api_category.php')
        .then((res) => res.json())
        .then((data) => {
          retrievePracticeCategories(
            data.trivia_categories.slice(0, data.trivia_categories.length - 3)
          )
          localStorage.setItem('practiceCategories', JSON.stringify())
          updatePracticeOptions({
            target: { name: 'category', value: data.trivia_categories[0].id }
          })
        })
        .catch((err) => {
          // console.log(err)
        })
    }
  }, [showPracticeOptions])

  // LOAD PRACTICE TRIVIA QUESTIONS
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
              setPracticeTrivia(trivia)
            }, time)
            return
          }
          setPracticeTrivia(trivia)
        })
        .catch((err) => {
          // console.log(err)
          displayAlert(
            'danger',
            'Something went wrong retrieving your questions. Try again later.',
            5000
          )
        })
    }
  }, [loadingPractice])

  return (
    <div className="game">
      {showPracticeOptions && <PracticeOptions />}
      {practiceReady && <PracticeReady />}
      {practiceActive && <TriviaCarousel />}
      {practiceOver && <PracticeResults />}
      {loadingPractice && <h1 className="center">Loading...</h1>}
    </div>
  )
}

export default TriviaPractice
