import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import reducer from './reducer'
import {
  CHANGE_THEME,
  DISPLAY_ALERT,
  MISSING_FIELDS_ALERT,
  OPTION_COMBO_ERROR,
  CLEAR_ALERT,
  RETRIEVE_PRACTICE_CATEGORIES,
  UPDATE_PRACTICE_OPTIONS,
  LOAD_PRACTICE_BEGIN,
  LOAD_PRACTICE_SUCCESS,
  LOAD_PRACTICE_ERROR,
  START_PRACTICE,
  RESET_PRACTICE_OPTIONS,
  SELECT_PRACTICE_ANSWER,
  TOGGLE_PRACTICE_QUESTION,
  SUBMIT_PRACTICE_ANSWERS,
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_EMAIL_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_PASSWORD_BEGIN,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  REQUEST_PASSWORD_RESET_BEGIN,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_ERROR
} from './actions'

let user = localStorage.getItem('user')
if (user === 'undefined') {
  localStorage.removeItem('user')
  user = undefined
}
const token = localStorage.getItem('token')
const localTheme = localStorage.getItem('theme')
console.log(localTheme)

const initialState = {
  // MAIN STATE
  theme: localTheme || 'strawberry',
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
  console.log(state.user)

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
    localStorage.setItem('theme', newTheme)
  }

  const signupNewUser = async (newUser) => {
    let response
    dispatch({ type: SIGNUP_USER_BEGIN })
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/auth/signup`,
        newUser
      )
      dispatch({ type: SIGNUP_USER_SUCCESS })
      response = { status: 'success', msg: data.msg }
    } catch (err) {
      console.log(err)
      dispatch({
        type: SIGNUP_USER_ERROR,
        payload: { msg: err.response.data.msg }
      })
      response = { status: 'error', msg: 'error' }
      clearAlert()
    }
    return response
  }

  const loginUser = async (currentUser, alertText) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/auth/login`,
        currentUser
      )
      const { user, token } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, alertText }
      })
      // ADD USER TO LOCAL STORAGE
      addUserToLocalStorage({ user, token })
    } catch (err) {
      console.log(err)
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: err.response.data.msg }
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (updatedUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('auth/updateUser', updatedUser)

      const { user, token, msg } = data

      console.log(msg)

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, alertText: msg }
      })
      if (!user) {
        removeUserFromLocalStorage()
        clearAlert(5000)
        return
      }
      addUserToLocalStorage({ user, token })
    } catch (err) {
      if (err.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: err.response.data.msg }
        })
      }
    }
    clearAlert()
  }

  const updatePassword = async (currentPassword, newPassword) => {
    if (!currentPassword || !newPassword) {
      return displayAlert('danger', 'You entered nothing... *golf clap*')
    }
    if (currentPassword === newPassword) {
      return displayAlert(
        'danger',
        'Your old and new passwords seem suspiciously similar. Fix that'
      )
    }
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updatePassword', {
        currentPassword,
        newPassword
      })
      const { token } = data
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: { token } })
      addUserToLocalStorage({ user: state.user, token })
    } catch (err) {
      if (err.response.status !== 401) {
        dispatch({
          type: UPDATE_PASSWORD_ERROR,
          payload: { msg: err.response.data.msg }
        })
      }
    }
    clearAlert()
  }

  const requestPasswordReset = async (user) => {
    dispatch({ type: REQUEST_PASSWORD_RESET_BEGIN })
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/auth/forgotPassword`,
        user
      )
      dispatch({
        type: REQUEST_PASSWORD_RESET_SUCCESS,
        payload: { alertText: data.msg }
      })
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({
        type: REQUEST_PASSWORD_RESET_ERROR,
        payload: { msg: err.response.data.msg }
      })
    }
    clearAlert()
  }

  // *******************************
  // *** PRACTICE STATE HANDLERS ***
  // *******************************
  const optionComboError = () => {
    dispatch({ type: OPTION_COMBO_ERROR })
    clearAlert(5000)
  }
  const retrievePracticeCategories = (categories) => {
    dispatch({ type: RETRIEVE_PRACTICE_CATEGORIES, payload: { categories } })
  }
  const loadPractice = () => {
    console.log('load questions yo')
    dispatch({ type: LOAD_PRACTICE_BEGIN })
  }
  const setPracticeTrivia = (questionsData) => {
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
        // GOOD
        changeTheme,
        displayAlert,
        // USER
        missingFieldsAlert,
        signupNewUser,
        loginUser,
        logoutUser,
        updateUser,
        updatePassword,
        requestPasswordReset,
        // PRACTICE GAME
        optionComboError,
        retrievePracticeCategories,
        updatePracticeOptions,
        loadPractice,
        setPracticeTrivia,
        startPractice,
        resetPracticeOptions,
        selectPracticeAnswer,
        togglePracticeQuestion,
        submitPracticeAnswers
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
