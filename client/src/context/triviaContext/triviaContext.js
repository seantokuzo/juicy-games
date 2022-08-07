import React, { useReducer, useContext } from 'react'
import triviaReducer from './triviaReducer'
import { UPDATE_MODE } from './triviaActions'

const initialState = {
  msg: 'hello from trivia context',
  mode: 'menu'
}

const baseURL = 'http://localhost:5000'

const TriviaContext = React.createContext()

const TriviaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(triviaReducer, initialState)

  const updateMode = (mode) => {
    dispatch({ type: UPDATE_MODE, payload: { mode } })
  }

  return (
    <TriviaContext.Provider
      value={{
        ...state,
        updateMode
      }}
    >
      {children}
    </TriviaContext.Provider>
  )
}

const useTriviaContext = () => {
  return useContext(TriviaContext)
}

export { initialState, TriviaContextProvider, useTriviaContext }
