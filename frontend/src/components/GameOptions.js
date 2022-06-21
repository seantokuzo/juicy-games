import React from 'react'
import { useAppContext } from '../context/appContext'

const GameOptions = () => {
  const { categories, gameOptions, startGame, updateGameOptions } = useAppContext()
  const { amount, category, difficulty, type } = gameOptions
  console.log(gameOptions)

  return (
    <div className="game-options__inputs">
      <div className="game-options__option">
        <label htmlFor="amount"># of Questions</label>
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

      <div className="game-options__option">
        <label htmlFor="category">Category</label>
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

      <div className="game-options__option">
        <label htmlFor="difficulty">Difficulty</label>
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
            <label htmlFor="multiple-choice">Multiple Choice</label>
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
            <label htmlFor="true-false">True/False</label>
          </div>
        </div>
      </div>

      <button type="button" className="game-options__btn" onClick={startGame}>
        Start Trivia
      </button>
    </div>
  )
}

export default GameOptions
