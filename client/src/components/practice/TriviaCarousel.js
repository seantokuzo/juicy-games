import React from 'react'
import { useAppContext } from '../../context/appContext'
import QuestionCard from '../QuestionCard'
import Alert from '../Alert'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { nanoid } from 'nanoid'

const TriviaCarousel = () => {
  const {
    practiceState: { currentPracticeQuestion, practiceTrivia },
    togglePracticeQuestion,
    submitPracticeAnswers,
    showAlert
  } = useAppContext()

  return (
    <div className="carousel">
      {showAlert && <Alert />}
      {practiceTrivia.map((q, index) => (
        <QuestionCard
          question={q.question}
          possibleAnswers={q.possibleAnswers}
          selectedAnswer={q.selectedAnswer}
          index={index}
          key={nanoid()}
        />
      ))}
      <div className="carousel__controls">
        <FaCaretLeft
          className="fa-solid fa-caret-left carousel-toggle carousel-char"
          onClick={() => togglePracticeQuestion(currentPracticeQuestion - 1)}
        />
        {/* <i
          className="fa-solid fa-caret-left carousel-toggle carousel-char"
          onClick={() => togglePracticeQuestion(currentPracticeQuestion - 1)}
        ></i> */}
        {practiceTrivia.map((x, i) => (
          <p
            className={
              x.selectedAnswer && currentPracticeQuestion === i + 1
                ? 'text carousel-number carousel-number--answered carousel-number--current carousel-char'
                : !x.selectedAnswer && currentPracticeQuestion === i + 1
                ? 'text carousel-number carousel-number--current carousel-char'
                : x.selectedAnswer
                ? 'text carousel-number carousel-number--answered carousel-char'
                : 'text carousel-number carousel-char'
            }
            key={nanoid()}
            onClick={() => togglePracticeQuestion(i + 1)}
          >
            {i + 1}
          </p>
        ))}
        <FaCaretRight
          className="fa-solid fa-caret-right carousel-toggle carousel-char"
          onClick={() => togglePracticeQuestion(currentPracticeQuestion + 1)}
        />
        {/* <i
          className="fa-solid fa-caret-right carousel-toggle carousel-char"
          onClick={() => togglePracticeQuestion(currentPracticeQuestion + 1)}
        ></i> */}
      </div>
      <div className="btn carousel__submit-btn">
        <h1 className="subtitle" onClick={submitPracticeAnswers}>
          Submit
        </h1>
      </div>
    </div>
  )
}

export default TriviaCarousel
