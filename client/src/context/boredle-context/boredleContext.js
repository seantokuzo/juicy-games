import React, { useReducer, useContext } from 'react'
import boredleReducer from './boredleReducer'
import {
  UPDATE_BOREDLE_MODE,
  TOGGLE_HARD_MODE,
  TOGGLE_DARK_MODE,
  TOGGLE_HIGH_CONTRAST_MODE,
  TOGGLE_HELP_MODAL,
  TOGGLE_STATS_MODAL,
  TOGGLE_SETTINGS_MODAL,
  SHOW_ALERT_MODAL,
  HIDE_ALERT_MODAL,
  INVALID_GUESS_START,
  INVALID_GUESS_STOP,
  IS_REVEALING_START,
  IS_REVEALING_STOP,
  GET_MY_BOREDLE_SUCCESS,
  GET_MY_BOREDLE_ERROR,
  HANDLE_KEYBOARD_LETTER,
  HANDLE_KEYBOARD_BACKSPACE,
  SUBMIT_GOTD_GUESS,
  SUBMIT_PRACTICE_GUESS,
  HANDLE_WIN,
  HANDLE_LOSS
} from './boredleActions'
import { useAppContext } from '../appContext'
import { VALID_GUESSES } from '../../components/games/boredle/game/data/validGuesses'
import {
  WORD_LENGTH,
  NUMBER_GUESSES,
  ANIME_DELAY,
  ANIME_DURATION,
  WIN_ANIME_DELAY,
  WIN_ANIME_DURATION,
  ALERT_DURATION
} from '../../components/games/boredle/game/data/gameSettings'
import {
  ALERT_MS_GUESS_NOT_FIVE,
  ALERT_MS_NOT_A_WORD,
  ALERT_MS_HARDMODE_CHECKER,
  ALERT_MS_RESET_PENALTY,
  ALERT_MS_RESET_MS,
  ALERT_MS_NEW_GAME,
  ALERT_MS_HARDMODE_TOGGLE
} from '../../components/games/boredle/game/data/alertsData'
import {
  getNewWord,
  getLettersArray,
  shareResults
} from '../../components/games/boredle/game/utils/gameUtils'
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
  darkMode: false,
  highContrastMode: false,
  showHelp: false,
  showStats: false,
  showSettings: false,
  showAlertModal: false,
  alertText: '',
  isRevealing: false,
  invalidGuessWiggle: false
}

const baseURL = 'http://localhost:5000'

const BoredleContext = React.createContext()

const BoredleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boredleReducer, initialState)
  const {
    isLoading,
    showAlert,
    startLoading,
    stopLoading,
    displayAlert,
    clearAlert,
    authFetch
  } = useAppContext()

  // console.log(state.gotd)
  // console.log(state.practice)
  console.log(state.stats)

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
    dispatch({ type: TOGGLE_HELP_MODAL })
  }

  const toggleStats = () => {
    dispatch({ type: TOGGLE_STATS_MODAL })
  }

  const toggleSettings = () => {
    dispatch({ type: TOGGLE_SETTINGS_MODAL })
  }

  const handleInvalidGuess = () => {
    dispatch({ type: INVALID_GUESS_START })
    setTimeout(() => {
      dispatch({ type: INVALID_GUESS_STOP })
    }, WIN_ANIME_DURATION + 100)
  }

  const handleReveal = (prevGuesses) => {
    dispatch({ type: IS_REVEALING_START })
    setTimeout(() => {
      if (prevGuesses) {
        dispatch({ type: SUBMIT_GOTD_GUESS, payload: { prevGuesses } })
      }
      dispatch({ type: IS_REVEALING_STOP })
    }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY)
  }

  const handleAlertModal = (alertText) => {
    dispatch({ type: SHOW_ALERT_MODAL, payload: { alertText } })
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT_MODAL })
    }, ALERT_DURATION + 150)
  }

  const handleWin = (newStats) => {
    dispatch({ type: HANDLE_WIN, payload: { newStats } })
    setTimeout(() => {
      toggleStats()
    }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY + 500)
  }

  const handleLoss = (newStats) => {
    dispatch({ type: HANDLE_LOSS, payload: { newStats } })
    setTimeout(() => {
      toggleStats()
    }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY + 500)
  }

  const submitGuessToDB = async (guess, gameStatus) => {
    try {
      const { data } = await authFetch.post('/boredle/submitGuess', {
        guess,
        gameStatus
      })
      // console.log(data)
      const { didWin, didLose, prevGuesses, stats } = data
      handleReveal(prevGuesses)
      // TO-DO
      if (didWin) return handleWin(stats)
      if (didLose) return handleLoss(stats)
    } catch (err) {
      console.log(err)
    }
  }

  const getMyBoredle = async () => {
    startLoading()
    try {
      const { data } = await authFetch('/boredle/getMyBoredle')
      console.log(data)
      const { currentGame, stats } = data
      const word = encryptBoredle(currentGame.word)
      dispatch({
        type: GET_MY_BOREDLE_SUCCESS,
        payload: { currentGame, stats, word }
      })
      stopLoading()
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_MY_BOREDLE_ERROR })
      displayAlert('danger alert-center', err.response.data.msg)
    }
    clearAlert()
  }

  const handleBoredleKeyboard = (key) => {
    const { didWin, didLose, isRevealing, invalidGuessWiggle } =
      state[state.mode]
    if (
      isRevealing ||
      didWin ||
      didLose ||
      invalidGuessWiggle ||
      isLoading ||
      showAlert
    )
      return

    // HANDLE BACKSPACE KEY
    if (key === 'Backspace') {
      if (state[state.mode].currentGuess.length <= 0) {
        handleInvalidGuess()
      }
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

    // HANDLE ENTER KEY
    if (key === 'Enter') {
      // CHECK IF GUESS IS PROPER LENGTH
      if (state[state.mode].currentGuess.length !== WORD_LENGTH) {
        handleInvalidGuess()
        handleAlertModal(ALERT_MS_GUESS_NOT_FIVE)
        return
      }
      // CHECK IF GUESS IS A VALID WORD
      if (
        !VALID_GUESSES.includes(
          state[state.mode].currentGuess.join('').toLowerCase()
        )
      ) {
        handleInvalidGuess()
        handleAlertModal(ALERT_MS_NOT_A_WORD)
        return
      }
      // TO-DO : TEST - HARDMODE CONDITION CHECKER
      if (state.hardMode && state[state.mode].prevGuesses.length > 0) {
        const mustUseLetters = getLettersArray(
          'must use',
          state[state.mode].answer,
          state[state.mode].prevGuesses
        )
        if (
          !mustUseLetters.every((letter) =>
            state[state.mode].currentGuess.includes(letter)
          )
        ) {
          handleInvalidGuess()
          handleAlertModal(ALERT_MS_HARDMODE_CHECKER)
          return
        }
      }
      //HANDLE A WIN
      if (
        decryptBoredle(state[state.mode].answer).every(
          (letter, i) => letter === state[state.mode].currentGuess[i]
        )
      ) {
        console.log('💥 WIN WIN WIN')
        if (state.mode === 'gotd') {
          submitGuessToDB(state.gotd.currentGuess, 'win')
          return
        }
        dispatch({ type: SUBMIT_PRACTICE_GUESS })
        handleWin()
        return
        //HANDLE INCORRECT GUESS WITH GUESSES REMAINING
      } else if (
        state[state.mode].prevGuesses.length >= 0 &&
        state[state.mode].prevGuesses.length < NUMBER_GUESSES - 1
      ) {
        console.log('💥 INCORRECT GUESS - GUESS REMAINING')
        if (state.mode === 'gotd') {
          submitGuessToDB(state.gotd.currentGuess, 'active')
          return
        }
        dispatch({ type: SUBMIT_PRACTICE_GUESS })
        return
        //HANDLE LOSS
      } else if (
        state[state.mode].prevGuesses.length === NUMBER_GUESSES - 1 &&
        state[state.mode].currentGuess !==
          decryptBoredle(state[state.mode].answer)
      ) {
        console.log('💥 LOSER LOSER LOSER')
        if (state.mode === 'gotd') {
          submitGuessToDB(state.gotd.currentGuess, 'lose')
          return
        }
        dispatch({ SUBMIT_PRACTICE_GUESS })
        handleLoss()
      }
      return
    }

    // HANDLE LETTERS
    if (
      state[state.mode].currentGuess.length >= 0 &&
      state[state.mode].currentGuess.length < WORD_LENGTH
    ) {
      const newCurrentGuess = [...state[state.mode].currentGuess, key]
      dispatch({ type: HANDLE_KEYBOARD_LETTER, payload: { newCurrentGuess } })
      return
    }
    handleInvalidGuess()
  }

  const handleShare = () => {
    shareResults(
      decryptBoredle(state.gotd.answer).join('').toUpperCase(),
      state.gotd.prevGuesses,
      state.hardMode,
      state.darkMode,
      state.highContrastMode,
      state.gotd.didWin
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
        toggleStats,
        toggleSettings,
        updateBoredleMode,
        getMyBoredle,
        handleBoredleKeyboard,
        handleShare
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
