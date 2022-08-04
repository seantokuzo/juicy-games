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
  UPDATE_USER_ERROR,
  UPDATE_AVATAR_BEGIN,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_ERROR,
  UPDATE_PASSWORD_BEGIN,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  REQUEST_PASSWORD_RESET_BEGIN,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  DELETE_ME_BEGIN,
  DELETE_ME_SUCCESS,
  DELETE_ME_ERROR,
  GET_MY_FRIENDS_BEGIN,
  GET_MY_FRIENDS_SUCCESS,
  GET_MY_FRIENDS_ERROR
} from './actions'

let user = localStorage.getItem('user')
if (user === 'undefined') {
  localStorage.removeItem('user')
  user = undefined
}
const token = localStorage.getItem('token')
const localTheme = localStorage.getItem('theme')

const initialState = {
  // MAIN STATE
  theme: localTheme || 'strawberry',
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  friendsData: {
    friends: [],
    sentRequests: [],
    receivedRequests: []
  },
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
    if (token) localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const addThemeToLocalStorage = (newTheme) => {
    localStorage.setItem('theme', newTheme)
  }

  const removeThemeFromLocalStorage = () => {
    localStorage.removeItem('theme')
  }

  const changeTheme = (newTheme) => {
    dispatch({ type: CHANGE_THEME, payload: { newTheme } })
    addThemeToLocalStorage(newTheme)
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
      // console.log(data)
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

  const updateMe = async (updatedUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('auth/updateMe', updatedUser)
      const { user, token, msg } = data

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

  const updateAvatar = async (avatar) => {
    dispatch({ type: UPDATE_AVATAR_BEGIN })
    try {
      const { data } = await authFetch.patch(`auth/updateAvatar`, { avatar })
      const { user, theme } = data
      changeTheme(theme)
      dispatch({ type: UPDATE_AVATAR_SUCCESS, payload: { user } })
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({
        type: UPDATE_AVATAR_ERROR,
        payload: { msg: err.response.data.msg }
      })
    }
    clearAlert(1500)
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
    dispatch({ type: UPDATE_PASSWORD_BEGIN })
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

  const resetPassword = async (resetToken, newPassword) => {
    dispatch({ type: RESET_PASSWORD_BEGIN })
    try {
      const { data } = await axios.patch(
        `${baseURL}/api/v1/auth/resetPassword/${resetToken}`,
        { newPassword }
      )
      const { user, token } = data
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: { user, token } })
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { msg: err.response.data.msg }
      })
    }
    clearAlert()
  }

  const deleteMe = async () => {
    dispatch({ type: DELETE_ME_BEGIN })
    try {
      await authFetch.delete('/auth/deleteMe')
      dispatch({ type: DELETE_ME_SUCCESS })
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({ type: DELETE_ME_ERROR, payload: err.response.data.msg })
    }
    clearAlert()
  }

  const getMyFriends = async () => {
    dispatch({ type: GET_MY_FRIENDS_BEGIN })
    try {
      const { data } = await authFetch('/auth/getMyFriends')
      const { friends, friendRequestsSent, friendRequestsReceived } = data
      dispatch({
        type: GET_MY_FRIENDS_SUCCESS,
        payload: { friends, friendRequestsSent, friendRequestsReceived }
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: GET_MY_FRIENDS_ERROR })
    }
    clearAlert()
  }

  const requestFriend = async (email) => {
    console.log(email)
    try {
      const { data } = await authFetch.post('/auth/requestFriend', { email })
      await getMyFriends()
      displayAlert('success', data.msg, 2000)
    } catch (err) {
      console.log(err)
      displayAlert('danger', err.response.data.msg)
    }
    clearAlert()
  }

  const respondToFriendRequest = async (email, status) => {
    try {
      const { data } = await authFetch.post('/auth/respondToFriendRequest', {
        email,
        status
      })
      displayAlert('success alert-center', data.msg, 1500)
    } catch (err) {
      console.log(err)
      displayAlert(
        'danger alert-center',
        'Something went wrong, try again later'
      )
    }
    await getMyFriends()
    clearAlert()
  }

  const removeFriend = async (email) => {
    console.log(email)
    try {
      const { data } = await authFetch.post('/auth/removeFriend', { email })
      console.log(data)
      displayAlert('success alert-center', data.msg, 3000)
    } catch (err) {
      console.log(err)
      displayAlert(
        'danger alert-center',
        'Something went wrong, try again later'
      )
    }
    await getMyFriends()
    clearAlert()
  }

  // ***********************************************
  // ***         PRACTICE STATE HANDLERS         ***
  // ***********************************************
  const optionComboError = () => {
    dispatch({ type: OPTION_COMBO_ERROR })
    clearAlert(5000)
  }
  const retrievePracticeCategories = (categories) => {
    dispatch({ type: RETRIEVE_PRACTICE_CATEGORIES, payload: { categories } })
  }
  const loadPractice = () => {
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
        updateMe,
        updateAvatar,
        updatePassword,
        requestPasswordReset,
        resetPassword,
        deleteMe,
        getMyFriends,
        requestFriend,
        respondToFriendRequest,
        removeFriend,
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
