import React, { useReducer, useContext } from 'react'
import boredleReducer from './boredleReducer'
import {
  UPDATE_BOREDLE_MODE,
  TOGGLE_HARD_MODE,
  TOGGLE_DARK_MODE,
  TOGGLE_HIGH_CONTRAST_MODE,
  TOGGLE_HELP_MODAL,
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
  HANDLE_KEYBOARD_ENTER
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
  mode: 'menu',
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
  hardMode: true,
  highContrastMode: false,
  showHelp: false,
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
  const { startLoading, stopLoading, displayAlert, clearAlert, authFetch } =
    useAppContext()

  console.log(state.gotd)
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
    // console.log('toggle help')
    dispatch({ type: TOGGLE_HELP_MODAL })
  }

  const toggleSettings = () => {
    // console.log('toggle settings')
    dispatch({ type: TOGGLE_SETTINGS_MODAL })
  }

  const handleInvalidGuess = () => {
    dispatch({ type: INVALID_GUESS_START })
    setTimeout(() => {
      dispatch({ type: INVALID_GUESS_STOP })
    }, WIN_ANIME_DURATION + 100)
  }

  const handleAlertModal = (alertText) => {
    dispatch({ type: SHOW_ALERT_MODAL, payload: { alertText } })
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT_MODAL })
    }, ALERT_DURATION + 150)
  }

  const submitGuessToDB = async () => {
    try {
      const { data } = authFetch('/boredle/submitGuess')
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  // const handleReveal = (str) => {
  //   dispatch({ type: IS_REVEALING_START })
  //   setTimeout(() => {
  //     // TO-DO
  //     // setPrevGuesses((prevPrevGuesses) => [...prevPrevGuesses, currentGuess])
  //     // setCurrentGuess([])
  //     dispatch({ type: IS_REVEALING_STOP })
  //     if (str === 'loss') {
  //       setDidLose(true)
  //     }
  //   }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY)
  //   if (str === 'win') {
  //     setTimeout(() => {
  //     }, ANIME_DELAY * WORD_LENGTH + 2 * ANIME_DELAY + WIN_ANIME_DELAY * WORD_LENGTH + 2 * WIN_ANIME_DELAY + 200)
  //   }
  // }

  const getMyBoredle = async () => {
    startLoading()
    try {
      const { data } = await authFetch('/boredle/getMyBoredle')
      const { currentGame, stats } = data
      const word = encryptBoredle(currentGame.word.word)
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
    const { didWin, didLose, isRevealing, invalidGuessWiggle } = state
    if (isRevealing || didWin || didLose || invalidGuessWiggle) return

    // HANDLE BACKSPACE KEY
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
      // HARDMODE CONDITION CHECKER
      if (state.hardMode && state[state.mode].prevGuesses.length > 0) {
        const mustUseLetters = getLettersArray(
          'must use',
          decryptBoredle(state[state.mode].answer),
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
        updateStats('win')
        setDidWin(true)
        handleReveal('win')
        return
        //HANDLE INCORRECT GUESS WITH GUESSES REMAINING
      } else if (
        prevGuesses.length >= 0 &&
        prevGuesses.length < NUMBER_GUESSES - 1
      ) {
        handleReveal('none')
        return
        //HANDLE LOSS
      } else if (
        prevGuesses.length === NUMBER_GUESSES - 1 &&
        currentGuess !== answer
      ) {
        updateStats('loss')
        handleReveal('loss')
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

    console.log('alert?')
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
        getMyBoredle,
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
