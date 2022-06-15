import React, { useState, useEffect } from 'react'
import GameOptions from '../components/GameOptions'

const Game = () => {
  const [categories, setCategories] = useState(undefined)
  const [showOptions, setShowOptions] = useState(true)
  console.log(categories)
  const [gameOptions, setGameOptions] = useState({
    amount: '5',
    category: '',
    difficulty: 'easy',
    type: 'multiple'
  })

  console.log(gameOptions)

  const updateOptions = (e) => {
    const { name, value } = e.target

    setGameOptions((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        setCategories(
          data.trivia_categories.slice(0, data.trivia_categories.length - 2)
        )
        setGameOptions((prev) => ({
          ...prev,
          category: data.trivia_categories[0].id.toString()
        }))
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="game page">
      <div
        className={
          showOptions ? 'game-options' : 'game-options game-options__hidden'
        }
      >
        <GameOptions
          categories={categories}
          gameOptions={gameOptions}
          updateOptions={updateOptions}
        />
      </div>
      <h1>Game</h1>
    </div>
  )
}

export default Game
