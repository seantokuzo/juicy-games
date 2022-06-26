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
  START_GAME,
  SELECT_ANSWER,
  TOGGLE_QUESTION
} from './actions'

const localTrivia = JSON.parse(localStorage.getItem('localTrivia'))

const initialState = {
  categories: undefined,
  showOptions: true,
  gameOptions: {
    amount: '5',
    category: '',
    difficulty: 'easy',
    type: 'multiple'
  },
  loadingQuestions: false,
  trivia: localTrivia || undefined,
  currentQuestion: 1,
  gameReady: false,
  gameActive: false,
  showAlert: false,
  alertText: ''
}

const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const optionComboError = () => {
    dispatch({ type: OPTION_COMBO_ERROR })
    clearAlert(5000)
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

  const selectAnswer = (index, answer) => {
    dispatch({ type: SELECT_ANSWER, payload: { index, answer } })
  }

  const toggleQuestion = (questionNumber) => {
    console.log(questionNumber < 1 || questionNumber > state.trivia.length)
    if (questionNumber < 1 || questionNumber > state.trivia.length) return
    dispatch({ type: TOGGLE_QUESTION, payload: { questionNumber } })
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
        startGame,
        selectAnswer,
        toggleQuestion
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
