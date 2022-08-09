import React, { useReducer, useContext } from 'react'
import boredleReducer from './boredleReducer'
import {
  UPDATE_BOREDLE_MODE,
  GET_WOTD_SUCCESS,
  GET_WOTD_ERROR
} from './boredleActions'
import { useAppContext } from '../appContext'
import { encryptBoredle, decryptBoredle } from '../../utils/boredleEncrypt'

const initialState = {
  mode: 'gotd',
  // GAME MODAL DISPLAYS
  showHelp: false,
  showStats: false,
  showSettings: false,
  isRevealing: false,
  guessWiggle: false,
  didWin: false,
  didLose: false,
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
  gotd: {
    answer: [],
    currentGuess: [],
    prevGuesses: []
  },
  practice: {
    answer: [],
    currentGuess: [],
    prevGuesses: []
  }
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

  const getWordOfTheDay = async () => {
    startLoading()
    try {
      const { data } = await authFetch('/boredle/getWordOfTheDay')
      const { word } = data
      const wordOTD = encryptBoredle(word)
      dispatch({ type: GET_WOTD_SUCCESS, payload: { word: wordOTD } })
      stopLoading()
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_WOTD_ERROR })
      displayAlert('danger alert-center', err.response.data.msg)
    }
    clearAlert()
  }

  return (
    <BoredleContext.Provider
      value={{
        ...state,
        updateBoredleMode,
        getWordOfTheDay
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
