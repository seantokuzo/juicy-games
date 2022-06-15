import React from 'react'

const GameOptions = ({ categories, gameOptions, updateOptions }) => {
  return (
    <div className="game-options__inputs">
      <label htmlFor="amount"># of Questions</label>
      <select
        name="amount"
        id="amount"
        className="game-options__amount game-options__selector"
        onChange={updateOptions}
      >
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </select>

      <label htmlFor="category">Category</label>
      <select
        name="category"
        id="category"
        className="game-options__categories game-options__selector"
        onChange={updateOptions}
      >
        {categories &&
          categories.map((cat) => (
            <option value={cat.id} key={cat.name}>
              {cat.name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default GameOptions
