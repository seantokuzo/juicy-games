import React, { useEffect } from 'react'
import Confetti from 'react-confetti'
import { useAppContext } from '../../../../context/appContext'
import { useBoredleContext } from '../../../../context/boredle-context/boredleContext'
import {
  BoredleHeader,
  GuessGrid,
  Keyboard,
  AlertModal,
  HelpModal,
  SettingsModal
} from './components'
import Alert from '../../../Alert'

const BoredleGame = () => {
  const { isLoading, showAlert } = useAppContext()
  const {
    mode,
    showAlertModal,
    showHelp,
    showSettings,
    isRevealing,
    invalidGuessWiggle,
    toggleHelp,
    toggleSettings,
    handleBoredleKeyboard
  } = useBoredleContext()
  const {
    [mode]: { didWin, didLose }
  } = useBoredleContext()

  // FOCUS THE APP ON PAGE LOAD
  useEffect(() => {
    const boredleWrapper = document.getElementById('boredle-wrapper')
    setTimeout(() => {
      boredleWrapper.focus()
    }, 100)
  }, [])

  const handleComputerKeyboard = (e) => {
    if (mode !== 'gotd' && mode !== 'practice') return
    if (isLoading || showAlert) return
    if (isRevealing || invalidGuessWiggle || didLose || didWin) return
    const { key } = e
    const letterRegex = /[a-zA-Z]/
    if (!letterRegex.test(key)) return
    if (key.length > 1 && key !== 'Enter' && key !== 'Backspace') return
    if (key === 'Enter') {
      if (showSettings) return toggleSettings()
      // TO-DO TOGGLE STATS
      // if (showStats) return toggleStats()
      if (showHelp) return toggleHelp()
    }
    handleBoredleKeyboard(key)
  }

  return (
    <div
      className="boredle__game"
      id="boredle-wrapper"
      onKeyDown={handleComputerKeyboard}
      tabIndex="0"
      selected
    >
      {didWin && <Confetti />}
      {showAlert && <Alert />}
      {showAlertModal && <AlertModal />}
      {showHelp && <HelpModal />}
      {showSettings && <SettingsModal />}
      <BoredleHeader />
      <GuessGrid />
      <Keyboard />
    </div>
  )
}

export default BoredleGame
