import {
  LOAD_QUESTIONS_BEGIN,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_ERROR,
  RETRIEVE_CATEGORIES,
  START_GAME,
  UPDATE_GAME_OPTIONS
} from './actions'

const reducer = (state, action) => {
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
      trivia: action.payload.questionsData
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
