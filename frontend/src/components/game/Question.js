import React from 'react'
import { useAppContext } from '../../context/appContext'
import { nanoid } from 'nanoid'

const Question = ({ index, question, possibleAnswers }) => {
  const { selectAnswer } = useAppContext()

  return (
    <div className="trivia-card" key={question}>
      <h3>{question}</h3>
      <div className="answer-choices-div">
        {possibleAnswers.map((answer) => {
          return (
            <div
              key={nanoid()}
              className="answer-choice"
              onClick={() => selectAnswer(index, answer)}
            >
              <p>{answer}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Question
