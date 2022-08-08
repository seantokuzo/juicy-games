import React, { useEffect } from 'react'
import { useBoredleContext } from '../../../context/boredleContext/boredleContext'
import MenuButton from './MenuButton'

const BoredleGOTD = () => {
  const { getWordOfTheDay } = useBoredleContext()

  useEffect(() => {
    getWordOfTheDay()
  }, [])

  return (
    <div className="boredle__gotd page">
      <h1 className="title">BoredleGOTD</h1>
      <MenuButton />
    </div>
  )
}

export default BoredleGOTD
