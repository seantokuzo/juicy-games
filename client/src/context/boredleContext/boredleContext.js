import React, { useReducer, useContext } from 'react'
import boredleReducer from './boredleReducer'
import { UPDATE_BOREDLE_MODE } from './boredleActions'
import { useAppContext } from '../appContext'
import { cryptBoredle } from '../../utils/boredleEncrypt'

const initialState = {
  msg: 'hello from boredle context',
  mode: 'menu'
}

const baseURL = 'http://localhost:5000'

const BoredleContext = React.createContext()

const BoredleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boredleReducer, initialState)
  const { authFetch } = useAppContext()

  const updateBoredleMode = (mode) => {
    dispatch({ type: UPDATE_BOREDLE_MODE, payload: { mode } })
  }

  const getWordOfTheDay = async () => {
    try {
      const { data } = await authFetch('/boredle/getWordOfTheDay')
      console.log(data)
      // const codeWord = data.word.split('').map((letter) => cryptBoredle(letter))
      // console.log(codeWord)
    } catch (err) {
      console.log(err)
    }
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
