import React, { useReducer, useContext } from 'react'
import boredleReducer from './boredleReducer'
import {
  UPDATE_BOREDLE_MODE,
  TOGGLE_HARD_MODE,
  TOGGLE_DARK_MODE,
  TOGGLE_HIGH_CONTRAST_MODE,
  TOGGLE_HELP_MODAL,
  TOGGLE_SETTINGS_MODAL,
  GET_WOTD_SUCCESS,
  GET_WOTD_ERROR,
  HANDLE_KEYBOARD_LETTER,
  HANDLE_KEYBOARD_BACKSPACE,
  HANDLE_KEYBOARD_ENTER
} from './boredleActions'
import { useAppContext } from '../appContext'
import { WORD_LENGTH } from '../../components/games/boredle/game/data/gameSettings'
import { encryptBoredle, decryptBoredle } from '../../utils/boredleEncrypt'

const initialState = {
  mode: 'gotd',
  // GAME MODAL DISPLAYS
  gotd: {
    answer: [],
    currentGuess: [],
    prevGuesses: [],
    didWin: false,
    didLose: false
  },
  practice: {
    answer: [],
    currentGuess: [],
    prevGuesses: [],
    didWin: false,
    didLose: false
  },
  stats: {
    wins: 0,
    losses: 0,
    streak: 0,
    maxStreak: 0,
    guessStats: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0
    }
  },
  hardMode: false,
  highContrastMode: false,
  showHelp: false,
  showSettings: false,
  showAlertModal: false,
  alertType: '',
  alertText: '',
  isRevealing: false,
  guessWiggle: false
}

const baseURL = 'http://localhost:5000'

const BoredleContext = React.createContext()

const BoredleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boredleReducer, initialState)
  const { startLoading, stopLoading, displayAlert, clearAlert, authFetch } =
    useAppContext()

  const updateBoredleMode = (mode) => {
    dispatch({ type: UPDATE_BOREDLE_MODE, payload: { mode } })
  }

  const toggleHardMode = () => {
    console.log('toggle hard mode')
    dispatch({ type: TOGGLE_HARD_MODE })
  }

  const toggleDarkMode = () => {
    console.log('toggle dark mode')
    dispatch({ type: TOGGLE_DARK_MODE })
  }

  const toggleHighContrastMode = () => {
    console.log('toggle high constrast')
    dispatch({ type: TOGGLE_HIGH_CONTRAST_MODE })
  }

  const toggleHelp = () => {
    // console.log('toggle help')
    dispatch({ type: TOGGLE_HELP_MODAL })
  }

  const toggleSettings = () => {
    // console.log('toggle settings')
    dispatch({ type: TOGGLE_SETTINGS_MODAL })
  }

  const getWordOfTheDay = async () => {
    startLoading()
    try {
      const { data } = await authFetch('/boredle/getWordOfTheDay')
      const { word } = data
      console.log(word)
      dispatch({
        type: GET_WOTD_SUCCESS,
        // TO-DO ENCRYPT ANSWER
        // payload: { word: encryptBoredle(word) }
        payload: { word: word.toUpperCase().split('') }
      })
      stopLoading()
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_WOTD_ERROR })
      displayAlert('danger alert-center', err.response.data.msg)
    }
    clearAlert()
  }

  const handleBoredleKeyboard = (key) => {
    console.log(key)
    const { didWin, didLose, isRevealing, invalidGuessWiggle } = state
    if (isRevealing || didWin || didLose || invalidGuessWiggle) return

    if (key === 'Backspace') {
      if (state[state.mode].currentGuess.length <= 0) {
        return console.log("Can't Backspace rn fam")
      }
      console.log('Backspace')
      const newCurrentGuess = state[state.mode].currentGuess.slice(
        0,
        state[state.mode].currentGuess.length - 1
      )
      dispatch({
        type: HANDLE_KEYBOARD_BACKSPACE,
        payload: { newCurrentGuess }
      })
      return
    }

    if (key === 'Enter') {
      console.log('submit answer - checks on checks')
      return
    }

    if (
      state[state.mode].currentGuess.length >= 0 &&
      state[state.mode].currentGuess.length < WORD_LENGTH
    ) {
      const newCurrentGuess = [...state[state.mode].currentGuess, key]
      dispatch({ type: HANDLE_KEYBOARD_LETTER, payload: { newCurrentGuess } })
      return
    }
    console.log('Did not pass conditions for action')
    displayAlert(
      'danger alert-center',
      "Can't add/subtract letter rn fam",
      2000
    )
  }

  return (
    <BoredleContext.Provider
      value={{
        ...state,
        toggleHardMode,
        toggleDarkMode,
        toggleHighContrastMode,
        toggleHelp,
        toggleSettings,
        updateBoredleMode,
        getWordOfTheDay,
        handleBoredleKeyboard
      }}
    >
      {children}
    </BoredleContext.Provider>
  )
}

const useBoredleContext = () => {
  return useContext(BoredleContext)
}

export { initialState, BoredleContextProvider, useBoredleContext }
