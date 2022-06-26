import React from 'react'
import { useAppContext } from '../../context/appContext'
import QuestionCard from './QuestionCard'
import { nanoid } from 'nanoid'

const TriviaCarousel = () => {
  const { trivia, currentQuestion } = useAppContext()
  console.log(trivia)

  return (
    <div className="carousel">
      {trivia.map((q, index) => (
        <QuestionCard
          question={q.question}
          possibleAnswers={q.possibleAnswers}
          selectedAnswer={q.selectedAnswer}
          index={index}
          key={nanoid()}
        />
      ))}
      <div className="carousel__controls">
        <i className="fa-solid fa-caret-left carousel-toggle carousel-char"></i>
        {trivia.map((x, i) => (
          <p
            className={
              currentQuestion === i + 1
                ? 'text carousel-number carousel-number--current carousel-char'
                : 'text carousel-number carousel-char'
            }
            key={nanoid()}
          >
            {i + 1}
          </p>
        ))}
        <i className="fa-solid fa-caret-right carousel-toggle carousel-char"></i>
      </div>
    </div>
  )
}

export default TriviaCarousel
