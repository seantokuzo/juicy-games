import React, { useEffect } from 'react'
import BoredleGame from './game/BoredleGame'
import { AlertModal, NewGameBtn } from './game/components'
import { useBoredleContext } from '../../../context/boredle-context/boredleContext'
import { decryptBoredle } from '../../../utils/boredleEncrypt'

const BoredlePractice = () => {
  const { practice, getPracticeWord, getLocalPractice, newPracticeGame } =
    useBoredleContext()
  const { didWin, didLose, answer } = practice

  useEffect(() => {
    const localPractice = localStorage.getItem('practice')
    console.log(localPractice)
    if (localPractice) return getLocalPractice()
    getPracticeWord()
  }, [])

  const newGameBtn = (
    <div className="boredle__practice-new-game boredle__alert theme-color theme-border">
      <NewGameBtn />
    </div>
  )

  return (
    <div className="boredle__practice page">
      {(didWin || didLose) && (
        <>
          <AlertModal
            text={`Answer: ${decryptBoredle(answer).join('')}`}
            practiceOver={true}
          />
        </>
      )}
      <BoredleGame />
    </div>
  )
}

export default BoredlePractice
