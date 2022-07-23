import {
  CHANGE_THEME,
  DISPLAY_ALERT,
  MISSING_FIELDS_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  RETRIEVE_PRACTICE_CATEGORIES,
  UPDATE_PRACTICE_OPTIONS,
  LOAD_PRACTICE_BEGIN,
  LOAD_PRACTICE_SUCCESS,
  LOAD_PRACTICE_ERROR,
  OPTION_COMBO_ERROR,
  START_PRACTICE,
  RESET_PRACTICE_OPTIONS,
  SELECT_PRACTICE_ANSWER,
  TOGGLE_PRACTICE_QUESTION,
  SUBMIT_PRACTICE_ANSWERS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === CHANGE_THEME) {
    return {
      ...state,
      theme: action.payload.newTheme
    }
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.alertType,
      alertText: action.payload.alertText
    }
  }
  if (action.type === MISSING_FIELDS_ALERT) {
    console.log('cmon')
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: "Don't be shy, fill out all the fields"
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
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null
    }
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      practiceState: {
        ...initialState.practiceState
      },
      isLoading: true
    }
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: 'success',
      alertText: 'Updated! Enjoy the new digs'
    }
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }
  // ************************************************************
  // PRACTICE GAME REDUCERS - NEED REFACTOR
  if (action.type === OPTION_COMBO_ERROR) {
    return {
      ...state,
      practiceState: {
        ...initialState.practiceState,
        practiceCategories: state.practiceState.practiceCategories
      },
      // OG RETURN
      showAlert: true,
      alertType: 'danger',
      alertText: `Database Error: There are no ${
        state.practiceState.practiceOptions.type === 'boolean'
          ? 'True/False'
          : 'Multiple Choice'
      } questions for ${
        state.practiceState.practiceCategories.filter(
          (cat) =>
            cat.id * 1 === state.practiceState.practiceOptions.category * 1
        )[0].name
      }. Please try a different combo of options`
    }
  }
  if (action.type === RETRIEVE_PRACTICE_CATEGORIES) {
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        practiceCategories: action.payload.categories
      }
    }
  }
  // practiceState: {
  //   practiceCategories: undefined,
  //   showPracticeOptions: true,
  //   practiceOptions: {
  //     amount: '5',
  //     category: '',
  //     difficulty: 'easy',
  //     type: 'multiple'
  //   },
  //   loadingPractice: false,
  //   practiceTrivia: undefined,
  //   currentPracticeQuestion: 1,
  //   practiceReady: false,
  //   practiceActive: false,
  //   practiceOver: false
  // },
  if (action.type === UPDATE_PRACTICE_OPTIONS) {
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        practiceOptions: {
          ...state.practiceState.practiceOptions,
          [action.payload.name]: action.payload.value
        }
      }
    }
  }
  if (action.type === LOAD_PRACTICE_BEGIN) {
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        showPracticeOptions: false,
        loadingPractice: true
      }
      // showOptions: false,
      // loadingQuestions: true
    }
  }
  if (action.type === LOAD_PRACTICE_SUCCESS) {
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        showPracticeOptions: false,
        loadingPractice: false,
        practiceTrivia: action.payload.questionsData,
        practiceReady: true,
        practiceOver: false
      }
    }
  }
  if (action.type === START_PRACTICE) {
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        showPracticeOptions: false,
        loadingPractice: false,
        practiceReady: false,
        practiceActive: true,
        practiceOver: false
      }
    }
  }
  if (action.type === RESET_PRACTICE_OPTIONS) {
    return {
      ...state,
      practiceState: {
        ...initialState.practiceState
      }
    }
  }
  if (action.type === SELECT_PRACTICE_ANSWER) {
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        practiceTrivia: [...state.practiceState.practiceTrivia].map((obj, i) =>
          i === action.payload.index
            ? {
                ...state.practiceState.practiceTrivia[action.payload.index],
                selectedAnswer:
                  action.payload.answer ===
                  state.practiceState.practiceTrivia[action.payload.index]
                    .selectedAnswer
                    ? ''
                    : action.payload.answer
              }
            : obj
        )
      }
    }
  }
  if (action.type === TOGGLE_PRACTICE_QUESTION) {
    console.log(action.payload.currentPracticeQuestion)
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        currentPracticeQuestion: action.payload.questionNumber
      }
    }
  }
  if (action.type === SUBMIT_PRACTICE_ANSWERS) {
    return {
      ...state,
      practiceState: {
        ...state.practiceState,
        practiceActive: false,
        practiceOver: true
      }
    }
  }
  // PRACTICE GAME REDUCERS - NEED REFACTOR
  // ************************************************************
  throw new Error(`No such action : ${action.type}`)
}

export default reducer
