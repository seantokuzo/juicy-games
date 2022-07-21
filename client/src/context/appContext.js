import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import {
  MISSING_FIELDS_ALERT,
  OPTION_COMBO_ERROR,
  CLEAR_ALERT,
  RETRIEVE_CATEGORIES,
  UPDATE_GAME_OPTIONS,
  LOAD_QUESTIONS_BEGIN,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR,
  START_GAME,
  RESET_OPTIONS,
  SELECT_ANSWER,
  TOGGLE_QUESTION,
  SUBMIT_ANSWERS,
  CHANGE_THEME,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR
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
  gameOver: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  theme: 'strawberry',
  user: null,
  token: null,
  isLoading: false
}

const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(state.trivia)

  const missingFieldsAlert = () => {
    dispatch({ type: MISSING_FIELDS_ALERT })
    clearAlert()
  }

  const optionComboError = () => {
    dispatch({ type: OPTION_COMBO_ERROR })
    clearAlert(5000)
  }

  const clearAlert = (time = 3000) => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, time)
  }

  const retrieveCategories = (categories) => {
    dispatch({ type: RETRIEVE_CATEGORIES, payload: { categories } })
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

  const resetOptions = () => {
    dispatch({ type: RESET_OPTIONS })
    localStorage.removeItem('localTrivia')
  }

  const selectAnswer = (index, answer) => {
    dispatch({ type: SELECT_ANSWER, payload: { index, answer } })

    // AUTO QUESTION SWITCHER ON ANSWER SELECT
    const unanswered = state.trivia.filter(
      (question) => !question.selectedAnswer
    )
    const nextUnanswered = unanswered.filter((q) => q.id !== index + 1)
    if (nextUnanswered.length > 0) toggleQuestion(nextUnanswered[0].id)
  }

  const toggleQuestion = (questionNumber) => {
    if (questionNumber < 1 || questionNumber > state.trivia.length) return
    dispatch({ type: TOGGLE_QUESTION, payload: { questionNumber } })
  }

  const submitAnswers = (str) => {
    // CHECK IF ALL QUESTIONS HAVE BEEN ANSWERED
    // const answers = state.trivia.map((triviaData) => triviaData.selectedAnswer)
    // if (!answers.every((answer) => answer) && str !== 'OUT_OF_TIME') {
    //   dispatch({
    //     type: DISPLAY_ALERT,
    //     payload: {
    //       alertType: 'danger',
    //       alertText:
    //         "You haven't answered all the questions. There's still time!"
    //     }
    //   })
    //   clearAlert(3000)
    //   return
    // }
    //SUBMIT ANSWERS
    dispatch({ type: SUBMIT_ANSWERS })
  }

  const changeTheme = (newTheme) => {
    dispatch({ type: CHANGE_THEME, payload: { newTheme } })
  }

  const setupUser = (user) => {
    console.log(user)
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        missingFieldsAlert,
        optionComboError,
        retrieveCategories,
        updateGameOptions,
        loadQuestions,
        setTrivia,
        startGame,
        resetOptions,
        selectAnswer,
        toggleQuestion,
        submitAnswers,
        changeTheme,
        setupUser
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
