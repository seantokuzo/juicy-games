import React, { useEffect } from 'react'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'
import BoredleGame from './game/BoredleGame'

const BoredleGOTD = () => {
  const { getMyBoredle } = useBoredleContext()

  useEffect(() => {
    getMyBoredle()
  }, [])

  return (
    <div className="boredle__gotd page">
      <BoredleGame />
    </div>
  )
}

export default BoredleGOTD
