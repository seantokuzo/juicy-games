import React from 'react'
import { useAppContext } from '../../context/appContext'

const GameOptions = () => {
  const { categories, gameOptions, loadQuestions, updateGameOptions } =
    useAppContext()
  const { amount, category, difficulty, type } = gameOptions
  // console.log(gameOptions)

  return (
    <div className="game-options">
      <div className="game-options__inputs">
        {/* NUMBER OF QUESTIONS */}
        <div className="game-options__option">
          <label className="game-options__label" htmlFor="amount">
            # of Questions
          </label>
          <select
            name="amount"
            id="amount"
            className="game-options__amount game-options__selector"
            onChange={updateGameOptions}
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
        <div className="game-options__option">
          <label className="game-options__label" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="game-options__categories game-options__selector"
            onChange={updateGameOptions}
            value={category}
          >
            {categories &&
              categories.map((cat) => (
                <option value={cat.id} key={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* DIFFICULTY OPTION */}
        <div className="game-options__option">
          <label className="game-options__label" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className="game-options__difficulty game-options__selector"
            onChange={updateGameOptions}
            value={difficulty}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>

        {/* QUESTION TYPE */}
        <div className="game-options__option">
          <p>Question type</p>
          <div className="game-options__radio-div">
            <div className="game-options__radio-option">
              <input
                type="radio"
                id="multiple-choice"
                name="type"
                value="multiple"
                checked={type === 'multiple'}
                onChange={updateGameOptions}
              />
              <label className="game-options__label" htmlFor="multiple-choice">
                Multiple Choice
              </label>
            </div>
            <div className="game-options__radio-option">
              <input
                type="radio"
                id="true-false"
                name="type"
                value="boolean"
                checked={type === 'boolean'}
                onChange={updateGameOptions}
              />
              <label className="game-options__label" htmlFor="true-false">
                True/False
              </label>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="game-options__btn"
          onClick={loadQuestions}
        >
          Start Trivia
        </button>
      </div>
    </div>
  )
}

export default GameOptions
