import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import reducer from './reducer'
import {
  CHANGE_THEME,
  DISPLAY_ALERT,
  MISSING_FIELDS_ALERT,
  OPTION_COMBO_ERROR,
  CLEAR_ALERT,
  RETRIEVE_CATEGORIES,
  UPDATE_PRACTICE_OPTIONS,
  LOAD_PRACTICE_BEGIN,
  LOAD_PRACTICE_SUCCESS,
  LOAD_PRACTICE_ERROR,
  START_PRACTICE,
  RESET_PRACTICE_OPTIONS,
  SELECT_PRACTICE_ANSWER,
  TOGGLE_PRACTICE_QUESTION,
  SUBMIT_PRACTICE_ANSWERS,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER
} from './actions'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const initialState = {
  // MAIN STATE
  theme: 'strawberry',
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  // PRACTICE GAME STATE
  practiceState: {
    practiceCategories: undefined,
    showPracticeOptions: true,
    practiceOptions: {
      amount: '5',
      category: '',
      difficulty: 'easy',
      type: 'multiple'
    },
    loadingPractice: false,
    practiceTrivia: undefined,
    currentPracticeQuestion: 1,
    practiceReady: false,
    practiceActive: false,
    practiceOver: false
  }
}

const baseURL = 'http://localhost:5000'

const AppContext = React.createContext()

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  // console.log(state.trivia)

  // AXIOS AUTH FETCH WITH TOKEN
  const authFetch = axios.create({
    baseURL: `${baseURL}/api/v1/`
  })
  // SET HEADER IN REQUESTS
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  // RESPONSE - CHECK IF ERROR IS INVALID AUTH
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (err) => {
      // LOGOUT USER IN CASE OF INVALID AUTHENTICATION
      console.log(err.response)
      if (err.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(err)
    }
  )

  const displayAlert = (alertType, alertText, time = 3000) => {
    dispatch({ type: DISPLAY_ALERT, payload: { alertType, alertText } })
    clearAlert(time)
  }

  // MISSING LOGIN / SIGNUP FIELDS
  const missingFieldsAlert = () => {
    dispatch({ type: MISSING_FIELDS_ALERT })
    clearAlert()
  }

  const clearAlert = (time = 3000) => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, time)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const changeTheme = (newTheme) => {
    dispatch({ type: CHANGE_THEME, payload: { newTheme } })
  }

  const setupUser = async (currentUser, endpoint, alertText) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/auth/${endpoint}`,
        currentUser
      )
      console.log(data)
      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText }
      })
      // ADD USER TO LOCAL STORAGE
      addUserToLocalStorage({ user, token })
    } catch (err) {
      console.log(err)
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: err.response.data.msg }
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  // ********************************************************
  // THESE ARE ALL FOR THE PRACTICE GAME - WILL BE REFACTORED
  const optionComboError = () => {
    dispatch({ type: OPTION_COMBO_ERROR })
    clearAlert(5000)
  }
  const retrievePracticeCategories = (categories) => {
    dispatch({ type: RETRIEVE_CATEGORIES, payload: { categories } })
  }
  const loadPractice = () => {
    console.log('load questions yo')
    dispatch({ type: LOAD_PRACTICE_BEGIN })
  }
  const setTrivia = (questionsData) => {
    dispatch({ type: LOAD_PRACTICE_SUCCESS, payload: { questionsData } })
  }
  const updatePracticeOptions = (e) => {
    const { name, value } = e.target
    dispatch({
      type: UPDATE_PRACTICE_OPTIONS,
      payload: {
        name,
        value
      }
    })
  }
  const startPractice = () => {
    dispatch({ type: START_PRACTICE })
  }
  const resetPracticeOptions = () => {
    dispatch({ type: RESET_PRACTICE_OPTIONS })
  }
  const selectPracticeAnswer = (index, answer) => {
    dispatch({ type: SELECT_PRACTICE_ANSWER, payload: { index, answer } })

    // AUTO QUESTION SWITCHER ON ANSWER SELECT
    const unanswered = state.practiceState.practiceTrivia.filter(
      (question) => !question.selectedAnswer
    )
    const nextUnanswered = unanswered.filter((q) => q.id !== index + 1)
    if (nextUnanswered.length > 0) togglePracticeQuestion(nextUnanswered[0].id)
  }
  const togglePracticeQuestion = (questionNumber) => {
    if (
      questionNumber < 1 ||
      questionNumber > state.practiceState.practiceTrivia.length
    )
      return
    dispatch({ type: TOGGLE_PRACTICE_QUESTION, payload: { questionNumber } })
  }
  const submitPracticeAnswers = (str) => {
    // CHECK IF ALL QUESTIONS HAVE BEEN ANSWERED
    const answers = state.practiceState.practiceTrivia.map(
      (triviaData) => triviaData.selectedAnswer
    )
    if (!answers.every((answer) => answer) && str !== 'OUT_OF_TIME') {
      console.log('we are here')
      displayAlert(
        'danger',
        "You haven't answered all the questions. There's still time!",
        5000
      )
      return
    }
    //SUBMIT ANSWERS
    dispatch({ type: SUBMIT_PRACTICE_ANSWERS })
  }
  // ********************************************************

  return (
    <AppContext.Provider
      value={{
        ...state,
        // PRACTICE GAME
        optionComboError,
        retrievePracticeCategories,
        updatePracticeOptions,
        loadPractice,
        setTrivia,
        startPractice,
        resetPracticeOptions,
        selectPracticeAnswer,
        togglePracticeQuestion,
        submitPracticeAnswers,
        // GOOD
        changeTheme,
        displayAlert,
        // USER
        missingFieldsAlert,
        setupUser,
        logoutUser
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
