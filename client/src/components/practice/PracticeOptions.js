import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import Alert from '../Alert'
import { AiFillCaretLeft } from 'react-icons/ai'

const PracticeOptions = () => {
  const {
    showAlert,
    practiceState: { practiceOptions, practiceCategories },
    loadPractice,
    updatePracticeOptions
  } = useAppContext()
  const navigate = useNavigate()
  const { amount, category, difficulty, type } = practiceOptions

  return (
    <div className="practice-options">
      <AiFillCaretLeft
        className="practice-options__caret-left"
        onClick={() => navigate(-1)}
      />
      <h3 className="practice-options__title title">Practice Trivia</h3>
      {/* NUMBER OF QUESTIONS */}
      {showAlert && <Alert />}
      <div className="practice-options__option">
        <label className="practice-options__label text" htmlFor="amount">
          # of Questions
        </label>
        <select
          name="amount"
          id="amount"
          className="practice-options__amount practice-options__selector"
          onChange={updatePracticeOptions}
          value={amount}
        >
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* CATEGORY OPTION */}
      <div className="practice-options__option">
        <label className="practice-options__label text" htmlFor="category">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="practice-options__categories practice-options__selector"
          onChange={updatePracticeOptions}
          value={category}
        >
          {practiceCategories &&
            practiceCategories.map((category) => (
              <option value={category.id} key={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {/* DIFFICULTY OPTION */}
      <div className="practice-options__option">
        <label className="practice-options__label text" htmlFor="difficulty">
          Difficulty
        </label>
        <select
          name="difficulty"
          id="difficulty"
          className="practice-options__difficulty practice-options__selector"
          onChange={updatePracticeOptions}
          value={difficulty}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </div>

      {/* QUESTION TYPE */}
      <div className="practice-options__option">
        <p>Question type</p>
        <div className="practice-options__radio-div">
          <div className="practice-options__radio-option">
            <input
              type="radio"
              id="multiple-choice"
              name="type"
              value="multiple"
              checked={type === 'multiple'}
              onChange={updatePracticeOptions}
            />
            <label
              className="practice-options__label text"
              htmlFor="multiple-choice"
            >
              Multiple Choice
            </label>
          </div>
          <div className="practice-options__radio-option">
            <input
              type="radio"
              id="true-false"
              name="type"
              value="boolean"
              checked={type === 'boolean'}
              onChange={updatePracticeOptions}
            />
            <label
              className="practice-options__label text"
              htmlFor="true-false"
            >
              True/False
            </label>
          </div>
        </div>
      </div>
      <div className="btn practice-options__btn" onClick={loadPractice}>
        Load Questions
      </div>
    </div>
  )
}

export default PracticeOptions
