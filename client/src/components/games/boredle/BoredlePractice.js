import React, { useEffect } from 'react'
import BoredleGame from './game/BoredleGame'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'

const BoredlePractice = () => {
  const { getPracticeWord } = useBoredleContext()

  useEffect(() => {
    getPracticeWord()
  }, [])

  return (
    <div className="boredle__practice page">
      <BoredleGame />
    </div>
  )
}

export default BoredlePractice
