import React, { useState, useEffect } from 'react'
import GameOptions from '../components/GameOptions'

const Game = () => {
  const [categories, setCategories] = useState(undefined)
  const [showOptions, setShowOptions] = useState(true)
  const [gameOptions, setGameOptions] = useState({
    amount: '5',
    category: '',
    difficulty: 'easy',
    type: 'multiple'
  })
  const [trivia, setTrivia] = useState(undefined)
  const [gameActive, setGameActive] = useState(false)
  console.log(trivia)

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

  useEffect(() => {
    if (gameActive) {
      fetch(
        `https://opentdb.com/api.php?amount=${gameOptions.amount}&category=${gameOptions.category}&difficulty=${gameOptions.difficulty}&type=${gameOptions.type}`
      )
        .then((res) => res.json())
        .then((data) => setTrivia(data.results))
        .catch((err) => console.log(err))
      setShowOptions(false)
    }
  }, [gameActive])

  function startGame() {
    setGameActive(true)
  }

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
          startGame={startGame}
        />
      </div>
      <h1>Game</h1>
    </div>
  )
}

export default Game
