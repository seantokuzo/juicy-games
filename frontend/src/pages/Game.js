import React, { useState, useEffect } from 'react'
import GameOptions from '../components/GameOptions'

export default function Game() {
  const [categories, setCategories] = useState(undefined)
  console.log(categories)
  const [gameOptions, setGameOptions] = useState({
    show: true,
    amount: 5,
    category: '',
    difficulty: 'easy',
    type: 'multiple'
  })
  console.log(gameOptions)

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        setGameOptions((prev) => ({
          ...prev,
          category: data.trivia_categories[0].id
        }))
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="game page">
      <h1>Game</h1>
    </div>
  )
}
