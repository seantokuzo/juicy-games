import React from 'react'
import { useAppContext } from '../../context/appContext'
import Question from './QuestionCard'
import { nanoid } from 'nanoid'

const TriviaCarousel = () => {
  const { trivia } = useAppContext()
  console.log(trivia)

  return (
    <div className="carousel">
      {trivia.map((q, index) => (
        <Question
          question={q.question}
          possibleAnswers={q.possibleAnswers}
          selectedAnswer={q.selectedAnswer}
          index={index}
          key={nanoid()}
        />
      ))}
    </div>
  )
}

export default TriviaCarousel
