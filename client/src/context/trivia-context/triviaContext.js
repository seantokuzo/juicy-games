import React, { useReducer, useContext } from 'react'
import triviaReducer from './triviaReducer'
import { UPDATE_TRIVIA_MODE } from './triviaActions'

const initialState = {
  msg: 'hello from trivia context',
  mode: 'menu'
}

const TriviaContext = React.createContext()

const TriviaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(triviaReducer, initialState)

  const updateTriviaMode = (mode) => {
    dispatch({ type: UPDATE_TRIVIA_MODE, payload: { mode } })
  }

  return (
    <TriviaContext.Provider
      value={{
        ...state,
        updateTriviaMode
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
