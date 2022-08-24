import React, { useEffect } from 'react'
import BoredleGame from './game/BoredleGame'
import { AlertModal } from './game/components'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'
import { decryptBoredle } from '../../../utils/boredleEncrypt'

const BoredlePractice = () => {
  const { practice, getPracticeWord } = useBoredleContext()
  const { didLose, answer } = practice

  useEffect(() => {
    getPracticeWord()
  }, [])

  return (
    <div className="boredle__practice page">
      {didLose && (
        <AlertModal text={`Answer: ${decryptBoredle(answer).join('')}`} />
      )}
      <BoredleGame />
    </div>
  )
}

export default BoredlePractice
