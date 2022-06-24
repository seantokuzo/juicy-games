import {
  LOAD_QUESTIONS_BEGIN,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR,
  RETRIEVE_CATEGORIES,
  START_GAME,
  UPDATE_GAME_OPTIONS,
  OPTION_COMBO_ERROR,
  CLEAR_ALERT
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
//   trivia: undefined,
//   loadingQuestions: false,
//   gameActive: false,
//   showAlert: false,
//   alertText: ''
// }

const reducer = (state, action) => {
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
      categories: action.payload.cats
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
    console.log('loading questions')
    return {
      ...state,
      showOptions: false,
      loadingQuestions: true
    }
  }
  if (action.type === LOAD_QUESTIONS_SUCCESS) {
    console.log('loading questions')
    return {
      ...state,
      loadingQuestions: false,
      trivia: action.payload.questionsData,
      gameReady: true
    }
  }
  if (action.type === START_GAME) {
    return {
      ...state,
      showOptions: false,
      gameActive: true
    }
  }
  throw new Error(`No such action : ${action.type}`)
}

export default reducer
