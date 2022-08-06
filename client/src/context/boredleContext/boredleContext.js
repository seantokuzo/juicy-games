import React, { useReducer, useContext } from 'react'
import boredleReducer from './boredleReducer'
import { TEMP_ACTION } from './boredleActions'

const initialState = {
  msg: 'Hello from Boredle'
}

const baseURL = 'http://localhost:5000'

const BoredleContext = React.createContext()

const BoredleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boredleReducer, initialState)

  const tempAction = () => {
    dispatch({ type: TEMP_ACTION })
  }

  return (
    <BoredleContext.Provider
      value={{
        ...state,
        tempAction
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
