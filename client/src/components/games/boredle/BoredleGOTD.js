import React, { useEffect } from 'react'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'
import { decryptBoredle } from '../../../utils/boredleEncrypt'
import BoredleGame from './game/BoredleGame'
import { AlertModal } from './game/components'

const BoredleGOTD = () => {
  const { getMyBoredle, gotd } = useBoredleContext()

  useEffect(() => {
    getMyBoredle()
  }, [])

  return (
    <div className="boredle__gotd page">
      {gotd.didLose && (
        <AlertModal text={`Answer: ${decryptBoredle(gotd.answer).join('')}`} />
        )}
      {gotd.didWin && <AlertModal text={`You Win!`} />}
      <BoredleGame />
    </div>
  )
}

export default BoredleGOTD
