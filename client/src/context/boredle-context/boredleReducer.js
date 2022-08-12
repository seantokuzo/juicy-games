import {
  UPDATE_BOREDLE_MODE,
  TOGGLE_HARD_MODE,
  TOGGLE_DARK_MODE,
  TOGGLE_HIGH_CONTRAST_MODE,
  TOGGLE_HELP_MODAL,
  TOGGLE_SETTINGS_MODAL,
  SHOW_ALERT_MODAL,
  HIDE_ALERT_MODAL,
  INVALID_GUESS_START,
  INVALID_GUESS_STOP,
  IS_REVEALING_START,
  IS_REVEALING_STOP,
  GET_WOTD_SUCCESS,
  GET_WOTD_ERROR,
  HANDLE_KEYBOARD_LETTER,
  HANDLE_KEYBOARD_BACKSPACE,
  HANDLE_KEYBOARD_ENTER
} from './boredleActions'

import { initialState } from './boredleContext'

const boredleReducer = (state, action) => {
  if (action.type === UPDATE_BOREDLE_MODE) {
    return {
      ...state,
      mode: action.payload.mode
    }
  }
  if (action.type === TOGGLE_HARD_MODE) {
    return {
      ...state,
      hardMode: !state.hardMode
    }
  }
  if (action.type === TOGGLE_DARK_MODE) {
    return {
      ...state,
      darkMode: !state.darkMode
    }
  }
  if (action.type === TOGGLE_HIGH_CONTRAST_MODE) {
    return {
      ...state,
      highContrastMode: !state.highContrastMode
    }
  }
  if (action.type === TOGGLE_HELP_MODAL) {
    return {
      ...state,
      showHelp: !state.showHelp,
      showSettings: false
    }
  }
  if (action.type === TOGGLE_SETTINGS_MODAL) {
    return {
      ...state,
      showHelp: false,
      showSettings: !state.showSettings
    }
  }
  if (action.type === SHOW_ALERT_MODAL) {
    return {
      ...state,
      showAlertModal: true,
      alertText: action.payload.alertText
    }
  }
  if (action.type === HIDE_ALERT_MODAL) {
    return {
      ...state,
      showAlertModal: false,
      alertText: ''
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
  if (action.type === INVALID_GUESS_START) {
    return {
      ...state,
      invalidGuessWiggle: true
    }
  }
  if (action.type === INVALID_GUESS_STOP) {
    return {
      ...state,
      invalidGuessWiggle: false
    }
  }
  if (action.type === IS_REVEALING_START) {
    return {
      ...state,
      isRevealing: true
    }
  }
  if (action.type === IS_REVEALING_STOP) {
    return {
      ...state,
      isRevealing: false
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
  if (action.type === HANDLE_KEYBOARD_LETTER) {
    return {
      ...state,
      [state.mode]: {
        ...state[state.mode],
        currentGuess: action.payload.newCurrentGuess
      }
    }
  }
  if (action.type === HANDLE_KEYBOARD_BACKSPACE) {
    return {
      ...state,
      [state.mode]: {
        ...state[state.mode],
        currentGuess: action.payload.newCurrentGuess
      }
    }
  }
  throw new Error(`No such action: ${action.type}`)
}

export default boredleReducer
