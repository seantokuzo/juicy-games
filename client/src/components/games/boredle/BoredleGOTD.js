import React, { useEffect } from 'react'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'
import { decryptBoredle } from '../../../utils/boredleEncrypt'
import BoredleGame from './game/BoredleGame'
import { AlertModal } from './game/components'

const BoredleGOTD = () => {
  const { getMyBoredle, gotd, toggleStats } = useBoredleContext()
  const { didWin, didLose } = gotd

  // useEffect(() => {
  //   getMyBoredle()
  // }, [])

  useEffect(() => {
    if (didWin || didLose) toggleStats()
  }, [])

  return (
    <div className="boredle__gotd page">
      {/* {gotd.didLose && (
        <AlertModal text={`Answer: ${decryptBoredle(gotd.answer).join('')}`} />
      )} */}
      {/* {gotd.didWin && <AlertModal text={`You Win!`} />} */}
      <BoredleGame />
    </div>
  )
}

export default BoredleGOTD
