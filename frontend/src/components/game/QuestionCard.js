import React from 'react'
import { useAppContext } from '../../context/appContext'
import { nanoid } from 'nanoid'

const QuestionCard = ({ index, question, possibleAnswers, selectedAnswer }) => {
  const { selectAnswer, currentQuestion } = useAppContext()

  const cardClass =
    index + 1 < currentQuestion
      ? 'question-card question-card--hidden question-card--hidden-left'
      : index + 1 > currentQuestion
      ? 'question-card question-card--hidden question-card--hidden-right'
      : 'question-card question-card--current'

  return (
    <div className={cardClass} key={question}>
      <h1 className="question-card__label">#{index + 1}</h1>
      <h3 className="question-card__question">{question}</h3>
      <div className="question-card__answers">
        {possibleAnswers.map((answer) => {
          return (
            <div
              key={nanoid()}
              className={
                answer === selectedAnswer
                  ? 'question-card__answer--selected'
                  : 'question-card__answer'
              }
              onClick={() => selectAnswer(index, answer)}
            >
              <p className="question-card__answer-text">{answer}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionCard
