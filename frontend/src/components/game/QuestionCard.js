import React from 'react'
import { useAppContext } from '../../context/appContext'
import { nanoid } from 'nanoid'

const QuestionCard = ({ index, question, possibleAnswers, selectedAnswer }) => {
  const { selectAnswer } = useAppContext()

  return (
    <div className="question-card" key={question}>
      <h3 className="question-card__question">{question}</h3>
      <div className="question-card__answers">
        {possibleAnswers.map((answer) => {
          return (
            <div
              key={nanoid()}
              className="question-card__answer"
              onClick={() => selectAnswer(index, answer)}
            >
              <p
                className={
                  answer === selectedAnswer
                    ? 'question-card__answer-text--selected'
                    : 'question-card__answer-text'
                }
              >
                {answer}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionCard
