import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import GameOptions from '../components/GameOptions'

const Game = () => {
  const { showOptions, gameActive } = useAppContext()

  // useEffect(() => {
  //   if (gameActive) {
  //     fetch(
  //       `https://opentdb.com/api.php?amount=${gameOptions.amount}&category=${gameOptions.category}&difficulty=${gameOptions.difficulty}&type=${gameOptions.type}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => setTrivia(data.results))
  //       .catch((err) => console.log(err))
  //   }
  // }, [gameActive])

  return (
    <div className="game page">
      {showOptions && !gameActive && <GameOptions />}
      <h1>Game</h1>
    </div>
  )
}

export default Game
