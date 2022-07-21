import React from 'react'
import { useSwipeable } from 'react-swipeable'
import { useAppContext } from '../context/appContext'
import { nanoid } from 'nanoid'

const QuestionCard = ({ index, question, possibleAnswers, selectedAnswer }) => {
  const { selectAnswer, currentQuestion, toggleQuestion } = useAppContext()

  const cardClass =
    index + 1 < currentQuestion
      ? 'question-card question-card--hidden question-card--hidden-left'
      : index + 1 > currentQuestion
      ? 'question-card question-card--hidden question-card--hidden-right'
      : 'question-card question-card--current'

  const handlers = useSwipeable({
    delta: 50,
    preventScrollOnSwipe: true,
    onSwipedLeft: () => toggleQuestion(currentQuestion + 1),
    onSwipedRight: () => toggleQuestion(currentQuestion - 1)
  })

  return (
    <div {...handlers} className={cardClass} key={question}>
      <h1 className="question-card__label">#{index + 1}</h1>
      <h3 className="question-card__question fs-text">{question}</h3>
      <div className="question-card__answers fs-text">
        {possibleAnswers.map((answer) => {
          return (
            <div
              key={nanoid()}
              className={
                answer === selectedAnswer
                  ? 'question-card__answer question-card__answer--selected'
                  : 'question-card__answer'
              }
              onClick={() => {
                if (answer !== selectedAnswer) {
                  selectAnswer(index, answer)
                }
              }}
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
