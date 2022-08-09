import React from 'react'
import { useBoredleContext } from '../../../../context/boredle-context/boredleContext'
import {
  BoredleHeader,
  GuessGrid,
  Keyboard,
  AlertModal,
  HelpModal,
  SettingsModal
} from './components'

const BoredleGame = () => {
  const { showAlertModal } = useBoredleContext()

  return (
    <div className="boredle__game">
      {showAlertModal && <AlertModal />}
      <BoredleHeader />
      <GuessGrid />
      <Keyboard />
    </div>
  )
}

export default BoredleGame
