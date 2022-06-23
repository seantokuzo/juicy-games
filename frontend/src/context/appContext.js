import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import {
  OPTION_COMBO_ERROR,
  CLEAR_ALERT,
  RETRIEVE_CATEGORIES,
  UPDATE_GAME_OPTIONS,
  LOAD_QUESTIONS_BEGIN,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR,
  START_GAME
} from './actions'

const initialState = {
  categories: undefined,
  showOptions: true,
  gameOptions: {
    amount: '5',
    category: '',
    difficulty: 'easy',
    type: 'multiple'
  },
  trivia: undefined,
  loadingQuestions: false,
  gameActive: false,
  showAlert: false,
  alertText: ''
}

const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const optionComboError = () => {
    dispatch({ type: OPTION_COMBO_ERROR })
    clearAlert()
  }

  const clearAlert = (time = 3000) => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, time)
  }

  const retrieveCategories = (cats) => {
    dispatch({ type: RETRIEVE_CATEGORIES, payload: { cats } })
  }

  const loadQuestions = () => {
    dispatch({ type: LOAD_QUESTIONS_BEGIN })
  }

  const setTrivia = (questionsData) => {
    dispatch({ type: LOAD_QUESTIONS_SUCCESS, payload: { questionsData } })
  }

  const updateGameOptions = (e) => {
    const { name, value } = e.target
    dispatch({
      type: UPDATE_GAME_OPTIONS,
      payload: {
        name,
        value
      }
    })
  }

  const startGame = () => {
    dispatch({ type: START_GAME })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        optionComboError,
        retrieveCategories,
        updateGameOptions,
        loadQuestions,
        setTrivia,
        startGame
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, AppContextProvider, useAppContext }
