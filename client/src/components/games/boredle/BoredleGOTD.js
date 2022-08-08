import React, { useEffect } from 'react'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'
import BoredleGame from './game/BoredleGame'
import MenuButton from './MenuButton'

const BoredleGOTD = () => {
  const { getWordOfTheDay } = useBoredleContext()

  useEffect(() => {
    getWordOfTheDay()
  }, [])

  return (
    <div className="boredle__gotd page">
      <BoredleGame />
      <MenuButton />
    </div>
  )
}

export default BoredleGOTD
