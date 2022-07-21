import {
  MISSING_FIELDS_ALERT,
  CLEAR_ALERT,
  RETRIEVE_CATEGORIES,
  UPDATE_GAME_OPTIONS,
  LOAD_QUESTIONS_BEGIN,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR,
  OPTION_COMBO_ERROR,
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

import { initialState } from './appContext'

// const initialState = {
//   categories: undefined,
//   showOptions: true,
//   gameOptions: {
//     amount: '5',
//     category: '',
//     difficulty: 'easy',
//     type: 'multiple'
//   },
//   loadingQuestions: false,
//   trivia: localTrivia || undefined,
//   currentQuestion: 1,
//   gameReady: false,
//   gameActive: false,
//   showAlert: false,
//   alertText: ''
// }

const reducer = (state, action) => {
  if (action.type === MISSING_FIELDS_ALERT) {
    console.log('cmon')
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: "Don't be shy, fill out all the fields"
    }
  }
  if (action.type === OPTION_COMBO_ERROR) {
    return {
      ...initialState,
      categories: state.categories,
      showAlert: true,
      alertType: 'danger',
      alertText: `Database Error: There are no ${
        state.gameOptions.type === 'boolean' ? 'True/False' : 'Multiple Choice'
      } questions for ${
        state.categories.filter(
          (cat) => cat.id * 1 === state.gameOptions.category * 1
        )[0].name
      }. Please try a different combo of options`
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }
  if (action.type === RETRIEVE_CATEGORIES) {
    return {
      ...state,
      categories: action.payload.categories
    }
  }
  if (action.type === UPDATE_GAME_OPTIONS) {
    return {
      ...state,
      gameOptions: {
        ...state.gameOptions,
        [action.payload.name]: action.payload.value
      }
    }
  }
  if (action.type === LOAD_QUESTIONS_BEGIN) {
    return {
      ...state,
      showOptions: false,
      loadingQuestions: true
    }
  }
  if (action.type === LOAD_QUESTIONS_SUCCESS) {
    return {
      ...state,
      showOptions: false,
      loadingQuestions: false,
      trivia: action.payload.questionsData,
      gameReady: true,
      gameOver: false
    }
  }
  if (action.type === START_GAME) {
    return {
      ...state,
      showOptions: false,
      loadingQuestions: false,
      gameReady: false,
      gameActive: true,
      gameOver: false
    }
  }
  if (action.type === RESET_OPTIONS) {
    return {
      ...state,
      showOptions: true,
      trivia: undefined,
      loadingQuestions: false,
      gameReady: false,
      gameActive: false,
      gameOver: false,
      currentQuestion: 1
    }
  }
  if (action.type === SELECT_ANSWER) {
    return {
      ...state,
      trivia: [...state.trivia].map((obj, i) =>
        i === action.payload.index
          ? {
              ...state.trivia[action.payload.index],
              selectedAnswer:
                action.payload.answer ===
                state.trivia[action.payload.index].selectedAnswer
                  ? ''
                  : action.payload.answer
            }
          : obj
      )
    }
  }
  if (action.type === TOGGLE_QUESTION) {
    console.log(action.payload.currentQuestion)
    return {
      ...state,
      currentQuestion: action.payload.questionNumber
    }
  }
  if (action.type === SUBMIT_ANSWERS) {
    return {
      ...state,
      gameActive: false,
      gameOver: true
    }
  }
  if (action.type === CHANGE_THEME) {
    return {
      ...state,
      theme: action.payload.newTheme
    }
  }
  throw new Error(`No such action : ${action.type}`)
}

export default reducer
