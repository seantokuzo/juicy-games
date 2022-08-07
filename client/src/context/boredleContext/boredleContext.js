import React, { useReducer, useContext } from 'react'
import boredleReducer from './boredleReducer'
import { UPDATE_BOREDLE_MODE } from './boredleActions'

const initialState = {
  msg: 'hello from boredle context',
  mode: 'menu'
}

const baseURL = 'http://localhost:5000'

const BoredleContext = React.createContext()

const BoredleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boredleReducer, initialState)

  const updateBoredleMode = (mode) => {
    dispatch({ type: UPDATE_BOREDLE_MODE, payload: { mode } })
  }

  return (
    <BoredleContext.Provider
      value={{
        ...state,
        updateBoredleMode
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
