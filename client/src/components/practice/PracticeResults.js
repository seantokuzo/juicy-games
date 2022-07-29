import React from 'react'
import { useAppContext } from '../../context/appContext'
import { nanoid } from 'nanoid'

const PracticeResults = () => {
  const {
    practiceState: { practiceTrivia },
    resetPracticeOptions
  } = useAppContext()
  const correctAnswers = practiceTrivia.map((x) => x.correctAnswer)
  const selectedAnswers = practiceTrivia.map((x) => x.selectedAnswer)

  const score = correctAnswers.reduce((acc, answer, i) => {
    if (answer === selectedAnswers[i]) return acc + 1
    return acc
  }, 0)

  const createAnswer = (chosen, correct) => {
    if (chosen !== correct) {
      return (
        <>
          <div className="game-results__answer game-results__answer--incorrect">
            <p className="text game-results__answer-text">
              {!chosen ? 'Not Answered' : chosen}
            </p>
          </div>
          <div className="game-results__answer game-results__answer--correct">
            <p className="text game-results__answer-text">{correct}</p>
          </div>
        </>
      )
    }
    if (chosen === correct) {
      return (
        <div className="game-results__answer game-results__answer--correct">
          <p className="text game-results__answer-text">{chosen}</p>
        </div>
      )
    }
  }

  return (
    <div className="game-results">
      <h5 className=" subtitle game-results__score">
        Result: {score}/{correctAnswers.length}
      </h5>
      {practiceTrivia.map((x, i) => (
        <div className="game-results__question-div theme-border" key={nanoid()}>
          <p className=" subtitle game-results__number">#{i + 1}</p>
          <p className="game-results__question">{x.question}</p>
          <div className="game-results__answer-div">
            {createAnswer(x.selectedAnswer, x.correctAnswer)}
          </div>
        </div>
      ))}
      <div
        className="btn game-ready__btn game-results__btn"
        onClick={resetPracticeOptions}
      >
        <p className="text btn-text game-ready__btn-text">Play Again</p>
      </div>
    </div>
  )
}

export default PracticeResults
