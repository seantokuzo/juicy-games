import React from 'react'
import MenuButton from './MenuButton'
import BoredleGame from './game/BoredleGame'

const BoredlePractice = () => {
  return (
    <div className="boredle__practice page">
      <h1 className="title">Practice</h1>
      <BoredleGame />
      <MenuButton />
    </div>
  )
}

export default BoredlePractice
