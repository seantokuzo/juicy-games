import {
  UPDATE_BOREDLE_MODE,
  TOGGLE_HELP_MODAL,
  TOGGLE_SETTINGS_MODAL,
  GET_WOTD_SUCCESS,
  GET_WOTD_ERROR
} from './boredleActions'

import { initialState } from './boredleContext'

const boredleReducer = (state, action) => {
  if (action.type === UPDATE_BOREDLE_MODE) {
    return {
      ...state,
      mode: action.payload.mode
    }
  }
  if (action.type === TOGGLE_HELP_MODAL) {
    return {
      ...state,
      showHelp: !state.showHelp
    }
  }
  if (action.type === TOGGLE_SETTINGS_MODAL) {
    return {
      ...state,
      showSettings: !state.showSettings
    }
  }
  if (action.type === GET_WOTD_SUCCESS) {
    console.log(action.payload.word)
    return {
      ...state,
      gotd: {
        ...initialState.gotd,
        answer: action.payload.word
      },
      practice: {
        ...initialState.practice
      }
    }
  }
  if (action.type === GET_WOTD_ERROR) {
    return {
      ...state,
      gotd: {
        ...initialState.gotd
      },
      practice: {
        ...initialState.practice
      }
    }
  }
  throw new Error(`No such action: ${action.type}`)
}

export default boredleReducer
